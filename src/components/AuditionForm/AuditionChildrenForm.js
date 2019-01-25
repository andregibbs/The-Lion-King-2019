import React, { Component } from "react"
import ReactDOM from 'react-dom'
import { ReCaptcha } from 'react-recaptcha-v3'
import {
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

class AuditionForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            dob: '',
            age: '',
            height: '',
            email: '',
            phonenumber: '',
            address: '',
            postcode: '',
            photo1: '',
            photo2: '',
            experience: '',
            hear: '',
            googleVerified: '',
            validate: {
                name: '',
                dob: '',
                age: '',
                height: '',
                email: '',
                phonenumber: '',
                address: '',
                postcode: '',
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

        // Create form ref
        this.form = React.createRef();
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
            if (typeof this.state[key] === 'object' && this.state[key].constructor === Object) {
                for (let k in this.state[key]) {
                    formData.append(key + '[' + k + ']', this.state[key][k])
                }
            } else {
                formData.append(key, this.state[key]);
            }
        }

        //fetch with a *30* second timeout
        fetchWithTimeout(process.env.AUDITIONS_API_URL, {
            method: 'POST',
            body: formData,
        }, 30000)
            .then((result) => {
                console.log(result.ok);
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
                            validate[key] = response.errors[key]
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
                <p className='text-lg mb-0' ref={this.form}><strong>Thankyou for your submission, we will be in touch soon.</strong></p>
            ) : ( 
                <>
                    <Form onSubmit={(e) => this.handleSubmit(e)} noValidate ref={this.form}>
                        <FormGroup>
                            <Label for="name">Child's Full Name:*</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={this.state.name}
                                valid={this.state.validate.name === 'has-success'}
                                invalid={this.state.validate.name === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedback>
                                Child's full name is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dob">Date of Birth:*</Label>
                            <Input
                                type="text"
                                name="dob"
                                id="dob"
                                value={this.state.dob}
                                valid={this.state.validate.dob === 'has-success'}
                                invalid={this.state.validate.dob === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedback>
                                Date of birth is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="age">Age:*</Label>
                            <div className="select-wrapper">
                                <Input
                                    type="select"
                                    name="age"
                                    id="age"
                                    value={this.state.age}
                                    valid={this.state.validate.age === 'has-success'}
                                    invalid={this.state.validate.age === 'has-danger'}
                                    onChange={e => {
                                        this.handleChange(e)
                                        this.validateRequired(e)
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="8">10</option>
                                    <option value="11">11</option>
                                </Input>
                                <FormFeedback>
                                    Age is required
                                </FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="height">Height:* <span className="text-sm">(in CM e.g 140cm)</span></Label>
                            <Input
                                type="text"
                                name="height"
                                id="height"
                                value={this.state.height}
                                valid={this.state.validate.height === 'has-success'}
                                invalid={this.state.validate.height === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedback>
                                Height is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Parent email:*</Label>
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
                        <FormGroup>
                            <Label for="phonenumber">Parent Telephone number:*</Label>
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
                                Parent telephone number is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address:*</Label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                value={this.state.address}
                                valid={this.state.validate.postcode === 'has-success'}
                                invalid={this.state.validate.postcode === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedback>
                                Address is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="postcode">Postcode:*</Label>
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
                        <FormGroup>
                            <Label for="experience">Previous performance experience or training: <span className="text-sm">(if any)</span></Label>
                            <Input
                                type="textarea"
                                name="experience"
                                id="experience"
                                rows="5"
                                value={this.state.experience}
                                onChange={e => {
                                    this.handleChange(e)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="hear">How did you hear about these auditions?:*</Label>
                            <Input
                                type="text"
                                name="hear"
                                id="hear"
                                value={this.state.hear}
                                valid={this.state.validate.hear === 'has-success'}
                                invalid={this.state.validate.hear === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedback>
                                Please tell us how you heard about these auditions
                            </FormFeedback>
                        </FormGroup>

                        <Button className="btn--red">Submit</Button>
                    </Form>
                    <ReCaptcha
                        sitekey='6LfR50UUAAAAAErtS1uYUr6KzYDTKW295YfxrOqe'
                        action='action_name'
                        verifyCallback={this.onGoogleVerify}
                    />
                </>
            )}

            </>
        )
    }

}

export default AuditionForm