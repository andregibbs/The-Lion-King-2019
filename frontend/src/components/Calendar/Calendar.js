import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import CalendarToolbar from './CalendarToolbar';
import CalendarEvent from './CalendarEvent';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { StaticQuery, graphql } from "gatsby";
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
            //events: [],
            date: new Date(2019, 10, 1)
        }
    }

    componentDidMount() {
        if (this.props.site === "cardiff") {
            this.setState({
                date: new Date(2020, 7, 1)
            })
        }

        if (this.props.site === "edinburgh") {
            this.setState({
                date: new Date(2020, 2, 1)
            })
        }
    }

    checkDate = (date) => {
        const maxDate = new Date(2020, 2, 1)
        const minDate = new Date(2019, 11, 1)

        if (date <= maxDate && date >= minDate ) {
            this.setState({ date: new Date(date) })
        }

        // console.log(calendarYear)

        // if (this.props.site === "cardiff") {
        //     maxMonth = 9
        //     minMonth = 7
        // }

        // if (this.props.site === "edinburgh") {
        //     maxMonth = 4
        //     minMonth = 0
        // }

        // if (
        //     parseInt(calendarMonth) < parseInt(maxMonth) && 
        //     parseInt(calendarMonth) >= parseInt(minMonth)
        // ) {
        //     this.setState({ date: new Date(date) })
        // }
    }

    processDates = (dates) => {
    	var events = [];
    	dates.forEach((event, i) => {

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
                availablity: event.availablity,
                site: this.props.site
            })
        })
        return events;
    }

    render() {
    	const site = this.props.site;
    	var dates;

    	if (site==='cardiff') {
    		dates = this.props.data.allWordpressAcfOptions.edges[0].node.options.dates_cardiff;
    	} else if (site==='bristol') {
    		dates = this.props.data.allWordpressAcfOptions.edges[0].node.options.dates_bristol;
    	} else {
            dates = this.props.data.allWordpressAcfOptions.edges[0].node.options.dates_edinburgh;
        }

        var events = this.processDates(dates);
   console.log(this.props.site)
        return(
            <div className="calendar-wrapper">
                <BigCalendar
                    localizer={localizer}
                    defaultView={'month'}
                    events={events}
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
        )
    }

}

export default props => (
  <StaticQuery
    query={graphql`
      query {
          allWordpressAcfOptions {
		    edges {
		      node {
		        options {
		          dates_bristol {
		            date
		            time
		            show_url
		            availablity
		          }
		          dates_cardiff {
		            date
		            time
		            show_url
		            availablity
                  }
                  dates_edinburgh {
		            date
		            time
		            show_url
		            availablity
		          }
		        }
		      }
		    }
		  }
      }
    `}
    render={data => <Calendar data={data} {...props} />}
  />
);