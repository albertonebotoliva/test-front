import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

function BigCalendar({ events, handleSelect }) {
    return (
        <Calendar
            localizer={localizer}
            defaultView={"week"}
            selectable
            onSelectEvent={handleSelect}
            events={events}
            startAccessor="start"
            endAccessor="end"
        />
    );
}

export default BigCalendar;
