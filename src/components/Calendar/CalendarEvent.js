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

export default EventBlock