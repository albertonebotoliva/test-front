import moment from 'moment';
import IAvailability from '../interfaces/availability';

const formatAvailability = (date: string, name: string, index: string): IAvailability => ({
    id: index,
    title: name,
    allDay: false,
    start: moment(date).toDate(),
    end: moment(date).add(60, 'm').toDate()
});

export { formatAvailability }