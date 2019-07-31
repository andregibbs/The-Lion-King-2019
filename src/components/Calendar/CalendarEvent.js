import React from 'react'

const EventBlock = ({event}) => (
    <a href={event.url} target='_blank' rel='noopener noreferrer'>
        <div className={`event-${event.availablity}`}>
            <div>{event.title}</div>
        </div>
    </a>
)

export default EventBlock