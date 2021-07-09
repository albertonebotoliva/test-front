import mockAvailability from '../../services/mockAvailabilities.json';
import mockDoctors from '../../services/mockDoctors.json';
import { formatAvailability } from '../format';
import search from '../search';

describe('Helpers', () => {
    test('Format - Availability', () => {
        const availability = mockAvailability.slice(0, 1);
        const doctors = mockDoctors.slice(0, 1);
        const format = formatAvailability(availability[0].start, doctors[0].name, doctors[0].id);
        expect(JSON.stringify(format)).toBe("{\"id\":\"fd7778f2-5f75-4ea2-adf1-cfb3713750ff\",\"title\":\"Dr. Joanny Marie\",\"allDay\":false,\"start\":\"2021-07-26T22:07:58.010Z\",\"end\":\"2021-07-26T23:07:58.010Z\"}");
    });
    test('Search - Results', () => {
        const doctors = mockDoctors;
        const results = search(doctors, "Dr. Brunehaut Marchand");
        expect(results.length).toBe(1);
    });
});
