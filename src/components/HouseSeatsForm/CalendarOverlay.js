import React, { Component } from 'react'
import moment from 'moment'
import {
    FormGroup,
    Label,
    Input
} from 'reactstrap'

class CalendarToolbar extends Component {
    render() {

        const { 
            events, 
            selectedDate, 
            toggleCalendarOverlay, 
            handleTimeSelect 
        } = this.props 

        // Format date for the title
        const dateTitle = moment(selectedDate).format('dddd Do MMMM')
        
        // Get dates which contain date selected
        const dateObj = events.filter((event) => {
            return event.start.indexOf(moment(selectedDate).format('YYYY-MM-DD')) >= 0;
        });

        const radios = dateObj.map((date, i) => {
            return(
                <FormGroup check key={i}>
                    <Label check onClick={() => handleTimeSelect(date.start)}>
                        <Input type="radio" name="date" />{' '}
                        <strong className="ml-2">{moment(date.start).format('h:mm a')}</strong>
                    </Label>
                </FormGroup>
            )
        })

        return (
            <div className="calendar-overlay">
                <div>
                    <h3 className="text-lg text-red">{dateTitle}</h3>
                    <p>Choose your performance time!</p>
                    {radios}
                    <button href="#" onClick={toggleCalendarOverlay} class="link mt-3">Choose another date</button>
                </div>
            </div>
        );
    }
}

export default CalendarToolbar