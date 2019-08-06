import React, { Component } from "react"
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import fetchWithTimeout from 'js/fetchWithTimeout'
import CalendarToolbar from './CalendarToolbar';
import CalendarEvent from './CalendarEvent';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = BigCalendar.momentLocalizer(moment);

moment.locale('ko', {
    week: {
        dow: 1,
    },
});

class Calendar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            connection_to_production: '',
            date: '',
            events: [],
            selectedDate: '',
            success: false,
            date: new Date()
        }

        // Bind this to methods
        this.handleEventSelect = this.handleEventSelect.bind(this)
        this.handleTimeSelect = this.handleTimeSelect.bind(this)
        this.getEvents = this.getEvents.bind(this)
        this.checkDate = this.checkDate.bind(this)

        // Create form ref
        this.form = React.createRef();
    }

    componentDidMount() {
        // Set new events
        this.getEvents()
    }

    getEvents() {

        let events = []
        
        console.log('Bristol endpoint is: '+process.env.BRISTOL_ENDPOINT);        

        //fetchWithTimeout(process.env.BRISTOL_ENDPOINT, {
        fetchWithTimeout('/cms/wp-json/acf/v3/options/options', {
            method: 'GET'
        }, 5000)
            .then((result) => {
                if (!result.ok) {
                	console.log('caught error when retreiving calendar dates');
                    throw Error(result.statusText);//catch any server errors
                }
                return result;
            })
            .then(res => res.json())//convert response body to json
            .then((res) => {
            	console.log('converted dates to json ok');
                // Create new object ready for calendar
                if (res) {
                    res.acf.dates_bristol.forEach((event, i) => {

                        let title = ""
                        let time = ""

                        if (event.time === "evening") {
                            title = "7:30pm"
                            time = "19:30"
                        } else if (event.time === "earlyevening") {
                            title = "5:00pm"
                            time = "17:00"
                        } else {
                            title = "2:30pm"
                            time = "14:30"
                        }

                        const url = event.show_url
                        const date = event.date
                        events.push({
                            title: title,
                            url: url,
                            start: `${date}T${time}`,
                            end: `${date}T${time}`,
                            resource: event.time,
                            availablity: event.availablity
                        })
                    })

                    this.setState({
                        events : events
                    })
                } else {

                	console.log('res not set');
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

    checkDate(date) {
        const currentMonth = moment().format('M')
        const maxMonth = moment(currentMonth).add(3, 'M').format('M')
        const calendarMonth = moment(date).format('M')

        if (parseInt(calendarMonth) < parseInt(maxMonth) && parseInt(calendarMonth) >= parseInt(currentMonth)) {
            this.setState({ date: new Date(date) })
        } 
    }

    render() {

        return(
                <>
                    <div className="calendar-wrapper">
                        <BigCalendar
                            localizer={localizer}
                            defaultView={'month'}
                            events={this.state.events}
                            onSelectEvent={this.handleEventSelect}
                            onNavigate={this.checkDate}
                            date={this.state.date}
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
        )
    }

}

export default Calendar