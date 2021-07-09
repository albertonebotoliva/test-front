const URL = "https://tech-test.joovence.dev/api";
const doctorURL = `${URL}/doctors`;

const doctorService = {
    get: (): Promise<any> => (
        fetch(doctorURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    )
};

export { doctorService }

