import moment from 'moment';

const formatAvailability = (date, name, index) => ({
    id: index,
    title: name,
    allDay: false,
    start: new moment(date).toDate(),
    end: new moment(date).add(60, 'm').toDate()
});

export { formatAvailability }