import React, { Component } from "react"
import ReactDOM from 'react-dom'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
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

import CalendarToolbar from './CalendarToolbar';
import CalendarEvent from './CalendarEvent';
import CalendarOverlay from './CalendarOverlay';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = BigCalendar.momentLocalizer(moment) 

class HouseSeatsForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            connection_to_production: '',
            phonenumber: '',
            email: '',
            nameforcollection: '',
            tickets_amount: '',
            date: '',
            notes: '',
            googleVerified: '',
            sendingFormRequest: false,
            events: [],
            selectedDate: '',
            calendarOverlay: false,
            validate: {
                name: '',
                connection_to_production: '',
                phonenumber: '',
                email: '',
                nameforcollection: '',
                tickets_amount: '',
                googleVerified: '',
                date: '',
                googleVerifiedErrMsg: 'Google recaptcha is required'
            },
            success: false
        }

        // Bind this to methods
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onGoogleVerify = this.onGoogleVerify.bind(this)
        this.handleEventSelect = this.handleEventSelect.bind(this)
        this.handleTimeSelect = this.handleTimeSelect.bind(this)
        this.toggleCalendarOverlay = this.toggleCalendarOverlay.bind(this)
        this.getEvents = this.getEvents.bind(this)

        // Bind this to validation methods
        this.validateRequired = validateRequired.bind(this);
        this.validateEmail = validateEmail.bind(this);

        // Create form ref
        this.form = React.createRef();
    }

    componentDidMount() {
        // Set new events
        this.getEvents()
    }

    getEvents() {

        let events = []

        fetchWithTimeout(process.env.HOUSESEATS_ENDPOINT, {
            method: 'GET'
        }, 5000)
            .then((result) => {
                if (!result.ok) {
                    throw Error(result.statusText);//catch any server errors
                }
                return result;
            })
            .then(res => res.json())//convert response body to json
            .then((res) => {
                // Create new object ready for calendar
                if (res) {
                    res.acf.dates.forEach((event, i) => {
                        const title = event.time === "evening" ? "7:30pm" : "2:30pm"
                        const time = event.time === "evening" ? "19:30" : "14:30"
                        const date = event.date
                        events.push({
                            title: title,
                            start: `${date} ${time}`,
                            end: `${date} ${time}`,
                            resource: event.time
                        })
                    })

                    this.setState({
                        events
                    })
                }
            })
            .catch((error) => {
                console.log('caught error', error);
                // handle errors and timeout error
            });

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

    // Toggle the overlay
    toggleCalendarOverlay() {
        this.setState({
            calendarOverlay: !this.state.calendarOverlay
        })
    }

    handleEventSelect(event) {
        this.setState({
            selectedDate: event.start
        })
        // Show overlay
        this.toggleCalendarOverlay()
    }

    handleTimeSelect(dateTime) {
        const date = moment(dateTime).format('dddd, Do MMM YYYY h:mm a')
        this.setState({
            date
        })
        // Validate date
        this.validateRequired(false, "date", date)
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
        fetchWithTimeout(process.env.HOUSESEATS_API_URL, {
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

        return(
            <>
            {this.state.success ? (
                <p className='text-lg mb-0' ref={this.form}><strong>Thankyou for your submission, we will be in touch soon.</strong></p>
            ) : (
                <>
                    <div className="calendar-wrapper">
                        <BigCalendar
                            localizer={localizer}
                            defaultView={'month'}
                            events={this.state.events}
                            onSelectEvent={this.handleEventSelect}
                            views={{
                                month: true,
                                week: false,
                                agenda: false
                            }}
                            components={{
                                toolbar: CalendarToolbar,
                                event: CalendarEvent
                            }}
                        />
                        {this.state.calendarOverlay &&
                            <CalendarOverlay
                                events={this.state.events}
                                selectedDate={this.state.selectedDate}
                                toggleCalendarOverlay={this.toggleCalendarOverlay}
                                handleTimeSelect={this.handleTimeSelect}
                            />
                        }
                    </div>
                    <Form onSubmit={(e) => this.handleSubmit(e)} noValidate ref={this.form} className="pt-4">
                        <FormGroup>
                            <Label for="date">Date/Time (please select on calendar above)</Label>
                            <Input
                                type="text"
                                name="date"
                                id="date"
                                disabled
                                value={this.state.date}
                                valid={this.state.validate.date === 'has-success'}
                                invalid={this.state.validate.date === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedback>
                                The date is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
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
                                Your name is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="connection_to_production">Connection to the production</Label>
                            <Input 
                                type="text"
                                name="connection_to_production" 
                                id="connection_to_production" 
                                value={this.state.connection_to_production}
                                valid={this.state.validate.connection_to_production === 'has-success'}
                                invalid={this.state.validate.connection_to_production === 'has-danger'} 
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }} 
                            />
                            <FormFeedback>
                                Your connection to the production is required
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phonenumber">Contact telephone number</Label>
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
                        <FormGroup>
                            <Label for="email">Email address</Label>
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
                            <Label for="nameforcollection">Name for ticket collection <span className="text-sm">(if different from above)</span></Label>
                            <Input 
                                type="text" 
                                name="nameforcollection" 
                                id="nameforcollection"
                                value={this.state.nameforcollection}
                                onChange={e => {
                                    this.handleChange(e)
                                }} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tickets_amount">Number of tickets required <span className="text-sm">(max 4 tickets)</span></Label>
                            <div className="select-wrapper">
                                <Input
                                    type="select"
                                    name="tickets_amount"
                                    id="tickets_amount"
                                    value={this.state.tickets_amount}
                                    valid={this.state.validate.tickets_amount === 'has-success'}
                                    invalid={this.state.validate.tickets_amount === 'has-danger'}
                                    onChange={e => {
                                        this.handleChange(e)
                                        this.validateRequired(e)
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Input>
                                <FormFeedback>
                                    The number of tickets are required
                                </FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Additional notes</Label>
                            <Input 
                                type="text" 
                                name="notes" 
                                id="notes" 
                                value={this.state.notes}
                                onChange={e => {
                                    this.handleChange(e)
                                }} 
                            />
                        </FormGroup>

                        <Button className="btn--red">Submit</Button>
                    </Form>
                </>
            )}
            </>
        )
    }

}

export default HouseSeatsForm