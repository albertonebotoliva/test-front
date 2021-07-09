import { render, screen } from '@testing-library/react';
import Availabilities from '../availabilities';
import Bookings from '../bookings';


test('Views - Availabilities - Renders', () => {
    render(<Availabilities />);
    const element = screen.getByText(/Agenda/i);
    expect(element).toBeInTheDocument();
});

test('Views - Bookings - Renders', () => {
    render(<Bookings />);
    const element = screen.getByText(/Your Booking:/i);
    expect(element).toBeInTheDocument();
});
