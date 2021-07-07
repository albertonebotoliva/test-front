import { bookingService } from "../services/booking";
import { doctorService } from '../services/doctor';
import { availabilityService } from '../services/availability';
import { formatAvailability } from '../helpers/format';

export const setIsOpen = dispatch => isOpen => dispatch({ type: "set_is_open", isOpen: !isOpen });
export const setFilter = dispatch => e => dispatch({ type: "set_filter", filter: e.target.value });
export const handleOpenItems = dispatch => (openItems, item) => dispatch({ type: "set_open_items", openItems: { ...openItems, [item.id]: !openItems[item.id] } });
export const handleSetSelectedItem = (dispatch, state) => async (item) => {
    const filteredEvents = ((state.selectedItems[0] && state.selectedItems[0].id) === item.id)
        ? state.events
        : state.events.filter(event => event.id === item.id);
    dispatch({ type: "set_selected_items", item });
    return dispatch({ type: "filter_events", filteredEvents });
}
export const handleSelect = (dispatch, state) => event => dispatch({ type: "set_dialog", dialog: { open: true, ...event, doctor: state.filteredItems.filter(item => item.id === event.id) } });
export const handleClose = dispatch => () => dispatch({ type: "set_dialog", dialog: {} });
export const handleChange = (dispatch, state) => (e) => dispatch({ type: "set_dialog", dialog: { ...state.dialog, [e.target.name]: e.target.value } });
export const handleSubmit = (dispatch, state, props) => async () => {
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
export const getAvailabilities = (dispatch, state) => async () => {
    let availabilities = [];
    let allAvailabilities = [];
    let formatedAvailabilities = [];
    const doctors = await doctorService.get();
    dispatch({ type: "set_items", items: doctors });
    for (let i = 0; i < doctors.length; i++) {
        availabilities = await availabilityService.get(doctors[i]);
        formatedAvailabilities = availabilities.map((availability, index) => formatAvailability(availability.start, doctors[i].name, doctors[i].id))
        dispatch({ type: "set_events", events: formatedAvailabilities })
        allAvailabilities = allAvailabilities.concat(formatedAvailabilities);
    }
    return dispatch({ type: "filter_events", filteredEvents: allAvailabilities });
}