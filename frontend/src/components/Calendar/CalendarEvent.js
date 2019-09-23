import React, { Component } from 'react'
import { handleLinkClick } from "js/handleLinkClick"

class EventBlock extends Component {

    handleClick(event) {
        handleLinkClick(event, event.currentTarget);
    }

    render() {
        const event = this.props.event
        const site = this.props.site;

    	if (site === 'cardiff') {
    		intersitial = 'interstitial-timed-cardiff';
    	} else {
    		intersitial = 'interstitial-timed-bristol';
    	}

        return(
            <a href={event.url} className={intersitial} rel='noopener noreferrer' onClick={this.handleClick}>
                <div className={`event-${event.availablity}`}>
                    <div>{event.title}</div>
                </div>
            </a>
        )
    }
}

export default EventBlock