import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import IAvailability from '../../../interfaces/availability';

const localizer = momentLocalizer(moment);

interface IProps {
    events: Array<IAvailability>,
    handleSelect: any
}

function BigCalendar({ events, handleSelect }: IProps): JSX.Element {
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
