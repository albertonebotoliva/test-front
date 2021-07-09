import IDoctor from './doctor';

export default interface IBooking {
    id: string,
    start: string,
    title: string,
    name?: string,
    email?: string,
    phone?: string,
    doctor: Array<IDoctor>
}