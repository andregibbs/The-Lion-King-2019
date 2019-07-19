import React from 'react'

const EventBlock = ({ event }) => (
    <div className={`${event.resource === 'matinee' ? 'event-matinee' : 'event-evening' }`}>
        <div>{event.title}</div>
        <div>{event.name}</div>
    </div>
)

export default EventBlock