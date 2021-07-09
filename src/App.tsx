import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import Availabilities from './views/availabilities';
import Bookings from './views/bookings';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Redirect to="/availabilities" />
            </Route>
            <Route exact path="/availabilities" component={Availabilities} />
            <Route path="/bookings" component={Bookings} />
        </Switch>
    </Router>
);

export default App;
