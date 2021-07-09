import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';
import IBooking from '../../interfaces/booking';
import '../../App.css';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Bookings(props: any) {
    const [booking, setBooking] = useState<IBooking | undefined>(undefined);
    const classes: any = useStyles();

    useEffect(() => {
        const localBooking: string | null = window.localStorage.getItem("booking");
        localBooking && setBooking(JSON.parse(localBooking));
    }, []);

    const address = booking && booking.doctor[0]
        ? booking.doctor[0].address
        : { line1: null, line2: null, postalCode: null, city: null, country: null };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={3} className={classes.column}>
            </Grid>
            <Grid item xs={12} md={6} className={classes.column}>
                <div className={classes.logo}>
                    <img src="joovence-logo.png" alt="logo" width="70%" />
                </div>
                <h2>Your booking:</h2>
                {booking && (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Bonjour {booking.name} !
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {booking.email}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {booking.phone}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Vous avez rendez-vous avec le docteur  <b>{booking.title}</b> le {moment(booking.start).format('MMMM Do YYYY, h:mm:ss a')}
                                <br />
                                <br />
                                {address && address.line1 + " " + address.line2}
                                <br />
                                {address && address.postalCode + " " + address.city + " " + address.country}
                                <br />
                                <br />
                                Assurez-vous de venir 15 minutes avant l'heure réservée.
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Grid>
            <Grid item xs={12} md={3} className={classes.column}></Grid>
        </Grid>
    );

}

export default Bookings;