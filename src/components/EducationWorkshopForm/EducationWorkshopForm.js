import React, { Component } from "react"
import ReactDOM from 'react-dom'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input
} from 'reactstrap'
import {
    validateRequired,
    validateEmail,
    validateRequiredCheckbox
} from 'js/validations'
import fetchWithTimeout from 'js/fetchWithTimeout'

class EducationWorkshopForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameofschool: '',
            location: '',
            postcode: '',
            fullname: '',
            positionatschool: '',
            email: '',
            phonenumber: '',
            alternativecontactname: '',
            alternativecontactnumber: '',
            numberofstudents: '',
            yeargroup: '',
            suitablespace: '',
            suitablespacedescription: '',
            moreinformation: '',
            headteacherreviewed: '',
            googleVerified: '',
            validate: {
                nameofschool: '',
                location: '',
                postcode: '',
                fullname: '',
                positionatschool: '',
                email: '',
                phonenumber: '',
                numberofstudents: '',
                yeargroup: '',
                alternativecontactname: '',
                alternativecontactnumber: '',
                suitablespacedescription: '',
                moreinformation: '',
                headteacherreviewed: '',
                googleVerified: '',
                googleVerifiedErrMsg: 'Google recaptcha is required'
            },
            success: false
        }

        // Bind this to methods
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onGoogleVerify = this.onGoogleVerify.bind(this)

        // Bind this to validation methods
        this.validateRequired = validateRequired.bind(this);
        this.validateEmail = validateEmail.bind(this);
        this.validateRequiredCheckbox = validateRequiredCheckbox.bind(this);

        // Create form ref
        this.form = React.createRef();
    }

    componentDidMount() {
        loadReCaptcha('6LdwOKAUAAAAACTWAuP6kQEPo0uT_8zS7xSu3h7A');
    }

    onGoogleVerify(response) {
        const { validate } = this.state;

        let formData = new FormData();
        formData.append('g-recaptcha-response', response);

        //fetch with a 5 second timeout
        fetchWithTimeout(process.env.RECAPTCHA_API_URL, {
            method: 'POST',
            body: formData,
        }, 5000)
            .then((result) => {
                if (!result.ok) {
                    throw Error(result.statusText);//catch any server errors
                }
                return result;
            })
            .then(res => res.json())//convert response body to json
            .then((response) => {
                // If there are errors update validation state
                if (response.success === false) {
                    validate.googleVerified = 'has-danger'
                    this.setState({
                        validate,
                        googleVerified: false
                    });
                    throw Error('Failed recaptcha');
                } else {
                    //success
                    validate.googleVerified = ''
                    this.setState({
                        validate,
                        googleVerified: true
                    })
                }
            })
            .catch((error) => {
                console.log('caught error', error);
                // handle errors and timeout error
                validate.googleVerified = 'has-danger'
                this.setState({
                    validate,
                    googleVerified: false
                });
            });
    }

    // Method to update field values in state on change
    handleChange(e) {
        const target = e.target;
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value;

        // Update value in state
        this.setState({
            [name]: value,
        });
    }

    // Method to handle form submit
    handleSubmit(e) {
        e.preventDefault();

        //disable the button so we can't send multiple requests
        this.setState({ sendingFormRequest: true });

        // Create form data ready for api wrapper call
        let formData = new FormData();
        for (let key in this.state) {
            formData.append(key, this.state[key]);
        }


        // fetch with a *30* second timeout
        fetchWithTimeout(process.env.EDUCATIONWORKSHOP_API_URL, {
            method: 'POST',
            body: formData,
        }, 30000)
            .then((result) => {
                console.log(result);
                if (!result.ok) {
                    throw Error(result.statusText);//catch any server errors
                }
                return result;
            })
            .then(res => res.json()) //convert response body to json
            .then((response) => {
                console.log('got response:', response);

                console.log(response.errors)

                // If there are errors update validation state
                if (response.errors !== false && response.errors !== undefined) {

                    const { validate } = this.state

                    for (let key in response.errors) {
                        if (response.errors[key] === true) {
                            validate[key] = 'has-danger'
                        } else {
                            validate[key] = 'has-danger'
                            validate[`${key}ErrorMsg`] = response.errors[key]
                        }

                        this.setState({ validate });
                    }

                } else {
                    console.log(response.result);
                    if (response.success === true) {
                        this.setState({
                            success: true
                        });
                    }
                }
                //re-enable the button
                this.setState({ sendingFormRequest: false });

                // Scroll top top of form
                const domNode = ReactDOM.findDOMNode(this.form.current)
                window.scrollTo({
                    top: domNode.offsetTop,
                    behavior: 'smooth'
                })
            })
            .catch((error) => {
                //if there's a server-side error
                console.log(error)
            });

    }

    render() {

        return (
            <>
                {this.state.success ? (
                    <p className='text-lg text-center mb-0' ref={this.form}><strong>Thank you, your form has been submitted and you will be contacted soon by a member of the Disney Theatrical Group team.</strong></p>
                ) : (
                        <>
                            <Form onSubmit={(e) => this.handleSubmit(e)} noValidate ref={this.form}>
                                <Container>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Name of school:*</Label>
                                                <Input
                                                    type="text"
                                                    name="nameofschool"
                                                    id="nameofschool"
                                                    value={this.state.nameofschool}
                                                    valid={this.state.validate.nameofschool === 'has-success'}
                                                    invalid={this.state.validate.nameofschool === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Name of school is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-5">
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Location:*</Label>
                                                <Input
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    value={this.state.location}
                                                    valid={this.state.validate.location === 'has-success'}
                                                    invalid={this.state.validate.location === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Location is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Postcode:*</Label>
                                                <Input
                                                    type="text"
                                                    name="postcode"
                                                    id="postcode"
                                                    value={this.state.postcode}
                                                    valid={this.state.validate.postcode === 'has-success'}
                                                    invalid={this.state.validate.postcode === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Postcode is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Full Name:*</Label>
                                                <Input
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    value={this.state.fullname}
                                                    valid={this.state.validate.fullname === 'has-success'}
                                                    invalid={this.state.validate.fullname === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Full name is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Position at school:*</Label>
                                                <Input
                                                    type="text"
                                                    name="positionatschool"
                                                    id="positionatschool"
                                                    value={this.state.positionatschool}
                                                    valid={this.state.validate.positionatschool === 'has-success'}
                                                    invalid={this.state.validate.positionatschool === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Position at school is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">Email:*</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={this.state.email}
                                                    valid={this.state.validate.email === 'has-success'}
                                                    invalid={this.state.validate.email === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Email is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Phone number*</Label>
                                                <Input
                                                    type="text"
                                                    name="phonenumber"
                                                    id="phonenumber"
                                                    value={this.state.phonenumber}
                                                    valid={this.state.validate.phonenumber === 'has-success'}
                                                    invalid={this.state.validate.phonenumber === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Phone number is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="pb-5">
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="alternativecontactname">Alternative contact name*</Label>
                                                <Input
                                                    type="text"
                                                    name="alternativecontactname"
                                                    id="alternativecontactname"
                                                    value={this.state.alternativecontactname}
                                                    valid={this.state.validate.alternativecontactname === 'has-success'}
                                                    invalid={this.state.validate.alternativecontactname === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Alternative contact name is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="alternativecontactnumber">Alternative contact number*</Label>
                                                <Input
                                                    type="text"
                                                    name="alternativecontactnumber"
                                                    id="alternativecontactnumber"
                                                    value={this.state.alternativecontactnumber}
                                                    valid={this.state.validate.alternativecontactnumber === 'has-success'}
                                                    invalid={this.state.validate.alternativecontactnumber === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Alternative contact number is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="numberofstudents">Number of students expected to participate in workshop (min. 20, max. 40)*</Label>
                                                <Input
                                                    type="text"
                                                    name="numberofstudents"
                                                    id="numberofstudents"
                                                    value={this.state.numberofstudents}
                                                    valid={this.state.validate.numberofstudents === 'has-success'}
                                                    invalid={this.state.validate.numberofstudents === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Number of students is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="yeargroup">Year group*</Label>
                                                <Input
                                                    type="text"
                                                    name="yeargroup"
                                                    id="yeargroup"
                                                    value={this.state.yeargroup}
                                                    valid={this.state.validate.yeargroup === 'has-success'}
                                                    invalid={this.state.validate.yeargroup === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Year group is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="suitablespace">Can you confirm that you have a suitable space (hall or drama/dance studio with facility to play music) in which to hold the workshop?*</Label>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input 
                                                            type="radio" 
                                                            name="suitablespace" 
                                                            value="Yes"
                                                            onChange={e => {
                                                                this.handleChange(e)
                                                            }}/> Yes
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input 
                                                            type="radio" 
                                                            name="suitablespace" 
                                                            value="No"
                                                            onChange={e => {
                                                                this.handleChange(e)
                                                            }}/> No
                                                    </Label>
                                                </FormGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Input 
                                                    type="textarea" 
                                                    name="suitablespacedescription" 
                                                    id="suitablespacedescription" 
                                                    placeholder="Please provide a description of the space" 
                                                    aria-label="Please provide a description of the space" 
                                                    value={this.state.suitablespacedescription}
                                                    valid={this.state.validate.suitablespacedescription === 'has-success'}
                                                    invalid={this.state.validate.suitablespacedescription === 'has-danger'}
                                                    rows="5"
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    A description is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="moreinformation">Is there anything else that you would like to tell us that you think might be useful for us to know about the group?*</Label>
                                                <Input 
                                                    type="textarea" 
                                                    name="moreinformation" 
                                                    id="moreinformation"
                                                    placeholder="Please enter text here"
                                                    value={this.state.moreinformation}
                                                    valid={this.state.validate.moreinformation === 'has-success'}
                                                    invalid={this.state.validate.moreinformation === 'has-danger'}
                                                    rows="5"
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    More information is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="pb-5">
                                        <Col md={6}>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input 
                                                        type="checkbox" 
                                                        name="headteacherreviewed"
                                                        id="headteacherreviewed"
                                                        value={this.state.headteacherreviewed}
                                                        valid={this.state.validate.headteacherreviewed === 'has-success'}
                                                        invalid={this.state.validate.headteacherreviewed === 'has-danger'}
                                                        onChange={e => {
                                                            this.handleChange(e)
                                                            this.validateRequiredCheckbox(e)
                                                        }}
                                                    /> My head teacher has reviewed and is supportive of this application / I am the head teacher*
                                                    <FormFeedback>
                                                        Head teacher review is required
                                                    </FormFeedback>
                                                </Label>    
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="pb-5">
                                        <Col md={6}>
                                            By submitting this form you are agreeing to be contacted by a member of the Disney Theatrical Group team. The information provided in this application form will be subject to Disney’s Privacy Policy^ and will be used solely for the purpose of assessing your application.
                                        </Col>
                                        <Col md={6}>
                                            More information about THE LION KING’s award-winning Education Programme, which includes 10 behind-the-scenes episodes as well as curriculum-linked resources for Key Stages 2-4, can be found at <a href="//www.lionkingeducation.co.uk">www.lionkingeducation.co.uk</a>.
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col md={4}>
                                            <Button className="btn--red btn--block">Submit</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                            <ReCaptcha
                                sitekey='6LdwOKAUAAAAACTWAuP6kQEPo0uT_8zS7xSu3h7A'
                                action='action_name'
                                verifyCallback={this.onGoogleVerify}
                            />
                        </>
                    )}

            </>
        )
    }

}

export default EducationWorkshopForm