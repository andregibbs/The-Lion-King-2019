import React from 'react'

const EventBlock = ({ event }) => (
    <a href={event.show_url}>
            <div className={`event-${event.resource}`}>
                <div>{event.title}</div>
            </div>
       </a>
)

export default EventBlock