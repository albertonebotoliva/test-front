import React, { useReducer, useEffect } from 'react';
import { reducer, initialState } from '../../stores';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BookingDialog from '../../components/layout/genericDialog';
import BigCalendar from '../../components/layout/bigCalendar';
import DoctorList from '../../components/doctorList';

import bookingDialogConfig from '../../config/bookingDialog';

import {
    setIsOpen,
    setFilter,
    handleOpenItems,
    handleSetSelectedItem,
    handleSelect,
    handleClose,
    handleChange,
    handleSubmit,
    getAvailabilities
} from '../../stores/actions';

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
    const withReducer = func => (...args) => func(dispatch, state, props)(...args);

    const bookingDialog = bookingDialogConfig({
        handleChange: withReducer(handleChange),
        handleClose: withReducer(handleClose),
        handleSubmit: withReducer(handleSubmit)
    });

    useEffect(() => withReducer(getAvailabilities)(), []);

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
                    handleSetSelectedItem={withReducer(handleSetSelectedItem)}
                    handleOpenItems={withReducer(handleOpenItems)}
                    setFilter={withReducer(setFilter)}
                    setIsOpen={withReducer(setIsOpen)}
                />
            </Grid>
            <Grid item xs={12} md={9} className={classes.column}>
                <BigCalendar
                    events={state.filteredEvents}
                    handleSelect={withReducer(handleSelect)}
                />
            </Grid>
        </Grid>
    );
}

export default Availabilities;
