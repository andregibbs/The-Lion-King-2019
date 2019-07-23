import React, { Component } from "react"
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import fetchWithTimeout from 'js/fetchWithTimeout'

import CalendarToolbar from './CalendarToolbar';
import CalendarEvent from './CalendarEvent';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            connection_to_production: '',
            phonenumber: '',
            email: '',
            tickets_amount: '',
            date: '',
            notes: '',
            sendingFormRequest: false,
            events: [],
            selectedDate: '',
            success: false
        }

        // Bind this to methods
        this.handleEventSelect = this.handleEventSelect.bind(this)
        this.handleTimeSelect = this.handleTimeSelect.bind(this)
        this.getEvents = this.getEvents.bind(this)

        // Create form ref
        this.form = React.createRef();
    }

    componentDidMount() {
        // Set new events
        this.getEvents()
    }

    getEvents() {

        let events = []

        fetchWithTimeout(process.env.BRISTOL_ENDPOINT, {
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

    handleEventSelect(event) {
        this.setState({
            selectedDate: event.start
        })
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
                    </div>
                </>
            )}
            </>
        )
    }

}

export default Calendar