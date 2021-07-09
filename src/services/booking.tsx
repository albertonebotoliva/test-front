const URL = "https://tech-test.joovence.dev/api";
const bookingURL = `${URL}/bookings`;

const bookingService = {
    post: (date: string, doctorId: string): Promise<any> => (
        fetch(bookingURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                doctorId
            })
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    )
};

export { bookingService }

