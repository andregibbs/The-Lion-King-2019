import React from 'react'

const EventBlock = ({ event }) => (
    <a href={`{event.show_url}`}>
        <div className={`${event.resource === 'matinee' ? 'event-matinee' : 'event-evening', 'event-limited' }`}>
            <div>{event.title}</div>
        </div>
    </a>
)

export default EventBlock