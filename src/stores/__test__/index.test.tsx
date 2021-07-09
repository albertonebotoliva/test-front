import { reducer } from '../index';
import mockDoctors from '../../services/mockDoctors.json';
import mockAvailabilities from '../../services/mockAvailabilities.json';
import { formatAvailability } from '../../helpers/format';

const initialState = {
    items: [],
    filter: "",
    filteredItems: [],
    selectedItems: [],
    openItems: {},
    isOpen: false,
    dialog: {
        open: false,
        start: null,
        end: null
    },
    events: [],
    filteredEvents: []
}

describe('Stores', () => {
    test('Reducer - set_items', () => {
        const store = reducer(initialState, { type: 'set_items', items: mockDoctors });
        expect(store.items.length).toBe(10);
    });
    test('Reducer - set_is_open', () => {
        const store = reducer(initialState, { type: 'set_is_open', isOpen: true });
        expect(store.isOpen).toBe(true);
    });
    test('Reducer - set_filter', () => {
        const store = reducer(initialState, { type: 'set_filter', filter: "yellow" });
        expect(store.filter).toBe("yellow");
    });
    test('Reducer - set_selected_items', () => {
        const store = reducer(initialState, { type: 'set_selected_items', item: mockDoctors.slice(0, 1)[0], filter: mockDoctors.slice(0, 1)[0].name });
        expect(store.selectedItems.length).toBe(1);
    });
    test('Reducer - set_open_items', () => {
        const itemId = mockDoctors.slice(0, 1)[0].id;
        const store = reducer(initialState, { type: 'set_open_items', openItems: { [itemId]: true } });
        expect(JSON.stringify(store.openItems)).toBe("{\"fd7778f2-5f75-4ea2-adf1-cfb3713750ff\":true}");
    });
    test('Reducer - set_dialog', () => {
        const store = reducer(initialState, { type: 'set_dialog', dialog: { open: true, start: "start", end: "end" } });
        expect(store.dialog.open).toBe(true);
    });
    test('Reducer - set_events', () => {
        const formatedAvailabilities = mockAvailabilities.map((availability, index) => formatAvailability(availability.start, mockDoctors[0].name, mockDoctors[0].id))
        const store = reducer(initialState, { type: 'set_events', events: formatedAvailabilities });
        expect(store.events.length).toBe(10);
    });
    test('Reducer - filter_events', () => {
        const formatedAvailabilities = mockAvailabilities.map((availability, index) => formatAvailability(availability.start, mockDoctors[0].name, mockDoctors[0].id))
        const store = reducer(initialState, { type: 'filter_events', filteredEvents: formatedAvailabilities });
        expect(store.filteredEvents.length).toBe(10);
    });
})