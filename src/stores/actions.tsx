import { bookingService } from "../services/booking";
import { doctorService } from '../services/doctor';
import { availabilityService } from '../services/availability';
import { formatAvailability } from '../helpers/format';
import IDoctor from '../interfaces/doctor';
import IAvailability from '../interfaces/availability';

export const setIsOpen = (dispatch: any) => (isOpen: boolean) => dispatch({ type: "set_is_open", isOpen: !isOpen });
export const setFilter = (dispatch: any) => (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "set_filter", filter: e.target.value });
export const handleOpenItems = (dispatch: any) => (openItems: Array<IDoctor>, item: any) => dispatch({ type: "set_open_items", openItems: { ...openItems, [item.id]: !openItems[item.id] } });
export const handleSetSelectedItem = (dispatch: any, state: any) => async (item: IDoctor) => {
    const filteredEvents = ((state.selectedItems[0] && state.selectedItems[0].id) === item.id)
        ? state.events
        : state.events.filter((event: IAvailability) => event.id === item.id);
    dispatch({ type: "set_selected_items", item });
    return dispatch({ type: "filter_events", filteredEvents });
}
export const handleSelect = (dispatch: any, state: any) => (event: IAvailability) => dispatch({ type: "set_dialog", dialog: { open: true, ...event, doctor: state.filteredItems.filter((item: IDoctor) => item.id === event.id) } });
export const handleClose = (dispatch: any) => () => dispatch({ type: "set_dialog", dialog: { open: false, start: null, end: null } });
export const handleChange = (dispatch: any, state: any) => (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "set_dialog", dialog: { ...state.dialog, [e.target.name]: e.target.value } });
export const handleSubmit = (dispatch: any, state: any, props: any) => async () => {
    try {
        const booking = await bookingService.post(state.dialog.start, state.dialog.id);
        if (booking.id) {
            window.localStorage.setItem('booking', JSON.stringify(state.dialog));
            dispatch({ type: "set_dialog", dialog: { open: false, start: null, end: null } });
            props.history.push("/bookings");
        }
    } catch (error) {
        console.error(error);
    }
}
export const getAvailabilities = (dispatch: any, state: any) => async () => {
    let availabilities = [];
    let allAvailabilities: Array<IAvailability> = [];
    let formatedAvailabilities = [];
    const doctors = await doctorService.get();
    dispatch({ type: "set_items", items: doctors });
    for (let i = 0; i < doctors.length; i++) { //TODO: uncomment
        availabilities = await availabilityService.get(doctors[i]);
        formatedAvailabilities = availabilities.map((availability: IAvailability, index: number) => formatAvailability(availability.start, doctors[i].name, doctors[i].id))
        dispatch({ type: "set_events", events: formatedAvailabilities })
        allAvailabilities = allAvailabilities.concat(formatedAvailabilities);
    }
    return dispatch({ type: "filter_events", filteredEvents: allAvailabilities });
}