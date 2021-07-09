const URL = "https://tech-test.joovence.dev/api";
const availabilityURL = `${URL}/availabilities?doctorId=`;

const availabilityService = {
    get: (item: any): Promise<any> => (
        fetch(availabilityURL + item.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    )
};

export { availabilityService }
