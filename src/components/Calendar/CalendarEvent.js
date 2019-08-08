<<<<<<< HEAD
import React from 'react'

const EventBlock = ({event}) => (
    <a href={event.url} className="interstitial-timed-bristol">
        <div className={`event-${event.availablity}`}>
            <div>{event.title}</div>
        </div>
    </a>
)
=======
import React, { Component } from 'react'
import { handleLinkClick } from "js/handleLinkClick"

class EventBlock extends Component {

    handleClick(event) {
        handleLinkClick(event, event.currentTarget);
    }

    render() {

        const event = this.props.event

        return(
            <a href={event.url} className="interstitial-timed-bristol" rel='noopener noreferrer' onClick={this.handleClick}>
                <div className={`event-${event.availablity}`}>
                    <div>{event.title}</div>
                </div>
            </a>
        )
    }
}
>>>>>>> ag-calendartour-19-07-19

export default EventBlock