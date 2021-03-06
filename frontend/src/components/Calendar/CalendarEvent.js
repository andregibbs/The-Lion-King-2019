import React, { Component } from 'react'
import { handleLinkClick } from "js/handleLinkClick"

class CalendarEvent extends Component {

    handleClick(event) {
        handleLinkClick(event, event.currentTarget);
    }

    render() {
        const event = this.props.event;
        var interstitialClass;

    	if (event.site === 'cardiff') {
    		interstitialClass = 'interstitial-timed-wales'
    	} else if (event.site === 'bristol') {
    		interstitialClass = 'interstitial-timed-bristol'
        } else if (event.site === 'edinburgh') {
            interstitialClass = 'interstitial-timed-edinburgh'
        } else if (event.site === 'bradford') {
            interstitialClass = 'interstitial-timed-bradford'
        } else {
            interstitialClass = 'interstitial-timed-southampton'
        }
        
        console.log(event.site)

        return(
            <a href={event.url} className={interstitialClass} rel='noopener noreferrer' onClick={this.handleClick}>
                <div className={`event-${event.availablity}`}>
                    <div>{event.title}</div>
                </div>
            </a>
        )
    }
}

export default CalendarEvent