import React, { useReducer } from 'react';
import { reducer, initialState } from '../../stores';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BookingDialog from '../../components/layout/genericDialog';
import BigCalendar from '../../components/layout/bigCalendar';
import DoctorList from '../../components/doctorList';

import { doctorService } from '../../services/doctor';
import { bookingService } from '../../services/booking';
import { availabilityService } from '../../services/availability';

import { formatAvailability } from '../../helpers/format';
import bookingDialogConfig from '../../config/bookingDialog';

import '../../App.css';

const useStyles = makeStyles({
    content: {
        borderRight: "1px solid #ccc",
        height: "100vh",
        padding: 20
    },
    margin: {
        marginTop: 12
    },
    column: {
        overflow: "scroll",
        height: "100vh"
    },
    logo: {
        height: 60
    }
});

function Availabilities(props) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(async () => {
        const doctors = await doctorService.get();
        dispatch({ type: "set_items", items: doctors });
        let availabilities = [];
        let allAvailabilities = [];
        let formatedAvailabilities = [];
        for (let i = 0; i < doctors.length; i++) {
            availabilities = await availabilityService.get(doctors[i]);
            formatedAvailabilities = availabilities.map((availability, index) => formatAvailability(availability.start, doctors[i].name, doctors[i].id))
            dispatch({ type: "set_events", events: formatedAvailabilities })
            allAvailabilities = allAvailabilities.concat(formatedAvailabilities);
        }
        dispatch({ type: "filter_events", filteredEvents: allAvailabilities });
    }, []);

    const handleSelect = (event) => dispatch({ type: "set_dialog", dialog: { open: true, ...event, doctor: state.filteredItems.filter(item => item.id === event.id) } });

    const handleSubmit = async () => {
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
    const handleChange = (e) => dispatch({ type: "set_dialog", dialog: { ...state.dialog, [e.target.name]: e.target.value } })
    const handleClose = () => dispatch({ type: "set_dialog", dialog: {} });
    const bookingDialog = bookingDialogConfig({ handleChange, handleClose, handleSubmit });

    const handleSetSelectedItem = async (item) => {
        const filteredEvents = ((state.selectedItems[0] && state.selectedItems[0].id) === item.id)
            ? state.events
            : state.events.filter(event => event.id === item.id);
        dispatch({ type: "set_selected_items", item });
        return dispatch({ type: "filter_events", filteredEvents });
    }
    const handleOpenItems = (openItems, item) => dispatch({ type: "set_open_items", openItems: { ...openItems, [item.id]: !openItems[item.id] } })

    const setFilter = e => dispatch({ type: "set_filter", filter: e.target.value });
    const setIsOpen = isOpen => dispatch({ type: "set_is_open", isOpen: !isOpen });

    return (
        <Grid container spacing={3} className={classes.content}>
            <BookingDialog
                {...bookingDialog}
                open={state.dialog.open || bookingDialog.open}
            />
            <Grid item xs={12} md={3} className={classes.column}>
                <DoctorList
                    isOpen={state.isOpen}
                    openItems={state.openItems}
                    filteredItems={state.filteredItems}
                    selectedItems={state.selectedItems}
                    handleSetSelectedItem={handleSetSelectedItem}
                    handleOpenItems={handleOpenItems}
                    setFilter={setFilter}
                    setIsOpen={setIsOpen}
                />
            </Grid>
            <Grid item xs={12} md={9} className={classes.column}>
                <BigCalendar
                    events={state.filteredEvents}
                    handleSelect={handleSelect}
                />
            </Grid>
        </Grid>
    );
}

export default Availabilities;
