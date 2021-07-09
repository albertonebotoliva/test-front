import moment from 'moment';

const formatAvailability = (date: string, name: string, index: number) => ({
    id: index,
    title: name,
    allDay: false,
    start: moment(date).toDate(),
    end: moment(date).add(60, 'm').toDate()
});

export { formatAvailability }