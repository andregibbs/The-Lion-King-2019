import React, { Component } from "react"
import ReactDOM from 'react-dom'
import { loadReCaptcha, ReCaptcha } from 'recaptcha-v3-react'
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
    validateEmail
} from 'js/validations'
import fetchWithTimeout from 'js/fetchWithTimeout'

const captchaSiteId = "6LdwOKAUAAAAACTWAuP6kQEPo0uT_8zS7xSu3h7A"

class AccessTicketsForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            full_name: '',
            email: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            postcode: '',
            contact_phone_number: '',
            ticket_amount: '',
            access: '',
            access_requirements: '',
            googleVerified: '',
            validate: {
                full_name: '',
                email: '',
                address_line_1: '',
                city: '',
                postcode: '',
                contact_phone_number: '',
                ticket_amount: '',
                access: '',
                googleVerified: '',
                googleVerifiedErrMsg: 'Google recaptcha is required'
            },
            success: false
        }

        // Bind this to methods
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onGoogleVerify = this.onGoogleVerify.bind(this)
        this.validateForm = this.validateForm.bind(this)

        // Bind this to validation methods
        this.validateRequired = validateRequired.bind(this);
        this.validateEmail = validateEmail.bind(this);

        // Create form ref
        this.form = React.createRef();
    }

    componentDidMount() {
        loadReCaptcha({
            key: captchaSiteId,
            id: '344648038'
        });
    }

    onGoogleVerify(response) {

        console.log(response)

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

    validateForm() {
        const { validate } = this.state
        let result = true

        for (let key in validate) {
            if (key !== "googleVerified" && key !== "googleVerifiedErrMsg" && this.state[key] === "") {
                validate[key] = 'has-danger'
                this.setState({ validate })
                result = false
            }
        }

        return result
    }

    // Method to handle form submit
    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.sendingFormRequest) {

            // validate on submit
            if (!this.validateForm()) {
                return
            }

            //disable the button so we can't send multiple requests
            this.setState({ sendingFormRequest: true });

            // Create form data ready for api wrapper call
            let formData = {};
            for (let key in this.state) {
                if (typeof this.state[key] === 'object' && this.state[key].constructor === Object) {
                    for (let k in this.state[key]) {
                        formData[key + '[' + k + ']'] = this.state[key][k];
                        //formData.append(key + '[' + k + ']', this.state[key][k])
                    }
                } else {
                    formData[key] = this.state[key];
                    //formData.append(key, this.state[key]);
                }
            }

            console.log(formData)

            //fetch with a *30* second timeout
            fetchWithTimeout('https://48x4rqzjfa.execute-api.eu-west-2.amazonaws.com/v1/contact', {
                method: 'POST',
                body: JSON.stringify(formData),
            }, 30000)
                .then((result) => {
                    //console.log(result.ok);
                    if (!result.ok) {
                        throw Error(result.statusText);//catch any server errors
                    }
                    return result;
                })
                .then(res => res.json()) //convert response body to json
                .then((response) => {
                    //console.log('got response:', response);

                    // If there are errors update validation state
                    if (response.errors !== false && response.errors !== undefined) {
                        // Scroll top top of form
                        const domNode = ReactDOM.findDOMNode(this.form.current)
                        window.scrollTo({
                            top: domNode.offsetTop,
                            behavior: 'smooth'
                        })

                        const { validate } = this.state

                        for (let key in response.errors) {
                            if (response.errors[key] === true) {
                                validate[key] = 'has-danger'
                            } else {
                                validate[key] = response.errors[key]
                            }

                            this.setState({ validate });
                        }

                    } else {
                        //console.log(response.result);
                        if (response.result === 'success') {

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
                    //console.log(error)
                });
        }

    }

    render() {

        return (
            <Container fluid>
                {this.state.success ? 
                    (
                        <Row>
                            <Col className="pb-md-2 pl-3 pr-3 pl-md-5 pr-md-5">
                                <h2 className='text-red h3 py-3'>Your request was submitted</h2>
                                <p className='text-lg mb-0' ref={this.form}>
                                    Thank you for submitting your ticket request for The Lion King’s 20th anniversary giveaway. You will be contacted within 24 hours to confirm if you have been successful.
                                </p>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row>
                                <Col className="pb-md-2 pl-3 pr-3 pl-md-5 pr-md-5">
                                    <h1 className="text-red h3">The Lion King Anniversary Giveaway – Access Tickets Only</h1>
                                    <p>This form is for guests who wish to request accessible tickets to the giveaway performance on Friday 18 October 2019. Tickets will be allocated on a first-come, first-served basis to those who complete this form. You will be contacted within 24 hours to confirm if your claim has been successful.</p>
                                    <p><a href='/docs/pdf/TLK_ANNIVERSARY_TERMS_AND_CONDITIONS_AMENDS.pdf' target='_blank' rel='noopener noreferrer' className='no-interstitial-check'>Click here to read the full terms and condition</a></p>
                                </Col>
                            </Row>
                            <div className="py-4 pl-3 pr-3 pl-md-5 pr-md-5 bg-pale-yellow">
                                <Form onSubmit={(e) => this.handleSubmit(e)} noValidate ref={this.form}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="full_name">Full Name*</Label>
                                                <Input
                                                    type="text"
                                                    name="full_name"
                                                    id="full_name"
                                                    value={this.state.full_name}
                                                    valid={this.state.validate.full_name === 'has-success'}
                                                    invalid={this.state.validate.full_name === 'has-danger'}
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
                                                <Label for="email">Email*</Label>
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
                                                        this.validateEmail(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    A valid email address is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="address_line_1">Address line 1*</Label>
                                                <Input
                                                    type="text"
                                                    name="address_line_1"
                                                    id="address_line_1"
                                                    value={this.state.address_line_1}
                                                    valid={this.state.validate.address_line_1 === 'has-success'}
                                                    invalid={this.state.validate.address_line_1 === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Address line 1 is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="address_line_1">Address line 2</Label>
                                                <Input
                                                    type="text"
                                                    name="address_line_2"
                                                    id="address_line_2"
                                                    value={this.state.address_line_2}
                                                    valid={this.state.validate.address_line_2 === 'has-success'}
                                                    invalid={this.state.validate.address_line_2 === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="city">City*</Label>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={this.state.city}
                                                    valid={this.state.validate.city === 'has-success'}
                                                    invalid={this.state.validate.city === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    City is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="postcode">Postcode</Label>
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
                                                <Label for="contact_phone_number">Contact phone number*</Label>
                                                <Input
                                                    type="text"
                                                    name="contact_phone_number"
                                                    id="contact_phone_number"
                                                    value={this.state.contact_phone_number}
                                                    valid={this.state.validate.contact_phone_number === 'has-success'}
                                                    invalid={this.state.validate.contact_phone_number === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                />
                                                <FormFeedback>
                                                    Contact phone number is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="ticket_amount">How many tickets do you require?*</Label>
                                                <Input
                                                    type="select"
                                                    name="ticket_amount"
                                                    id="ticket_amount"
                                                    value={this.state.ticket_amount}
                                                    valid={this.state.validate.ticket_amount === 'has-success'}
                                                    invalid={this.state.validate.ticket_amount === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                >
                                                    <option value="">Please select</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </Input>
                                                <FormFeedback>
                                                    Ticket amount is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="ticket_amount">Do you or a member of your party require a space for a wheelchair?*</Label>
                                                <Input 
                                                    type="select" 
                                                    name="access"
                                                    id="access"
                                                    valid={this.state.validate.access === 'has-success'}
                                                    invalid={this.state.validate.access === 'has-danger'}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                        this.validateRequired(e)
                                                    }}
                                                >
                                                    <option value="">Please select</option>
                                                    <option value="No">No</option>
                                                    <option value="Yes">Yes - 1</option>
                                                    <option value="Yes">Yes - 2</option>
                                                </Input>
                                                <FormFeedback>
                                                This is required
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="access_requirements">Please describe your access requirements</Label>
                                                <Input
                                                    type="textarea"
                                                    rows="5"
                                                    name="access_requirements"
                                                    id="access_requirements"
                                                    placeholder="Please enter text here"
                                                    value={this.state.access_requirements}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6} className="py-3">
                                            <p>By submitting this form you are agreeing to be contacted by a member of the Lyceum Theatre box office which is operated by the Ambassador Theatre Group (ATG). The information provided in this application form will be subject to ATG’s Privacy Policy and will be used solely for the purpose of assessing your application.</p>
                                        </Col>
                                    </Row>

                                    <Button className="btn--red btn--300 w-100">Submit Form</Button> 
                                </Form>
                                <ReCaptcha
                                    sitekey={captchaSiteId}
                                    action='AccessTicketsForm'
                                    verifyCallback={this.onGoogleVerify}
                                />
                            </div>
                        </>
                    )}
            </Container>
        )
    }

}

export default AccessTicketsForm