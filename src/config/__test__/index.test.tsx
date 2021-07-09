import config from '../bookingDialog';

describe('Config', () => {
    test('Booking Dialog', () => {
        const bookingDialog = config({
            handleChange: null,
            handleClose: null,
            handleSubmit: null
        });
        expect(bookingDialog.title).toBe("Book a doctor!");
    });
});