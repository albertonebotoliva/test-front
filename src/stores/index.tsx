import search from '../helpers/search';
import IDoctor from '../interfaces/doctor';
import IAvailability from '../interfaces/availability';

type Dialog = {
    open: boolean,
    start: string | null,
    end: string | null,
    id?: string,
    allDay?: boolean,
    doctor?: Array<IDoctor>
    email?: string
    name?: string,
    phone?: string,
    title?: string
}

type State = {
    items: Array<IDoctor>,
    filter: string,
    filteredItems: Array<IDoctor>,
    selectedItems: Array<IDoctor>,
    openItems: object,
    isOpen: boolean,
    dialog: Dialog,
    events: Array<IAvailability>,
    filteredEvents: Array<IAvailability>
}

export const initialState: State = {
    items: [],
    filter: "",
    filteredItems: [],
    selectedItems: [],
    openItems: {},
    isOpen: true,
    dialog: {
        open: false,
        start: null,
        end: null
    },
    events: [],
    filteredEvents: []
}

type Action =
    | { type: 'set_items', items: Array<IDoctor> }
    | { type: 'set_is_open', isOpen: boolean }
    | { type: 'set_filter', filter: string }
    | { type: 'set_selected_items', item: IDoctor, filter: string }
    | { type: 'set_open_items', openItems: Array<IDoctor> }
    | { type: 'set_dialog', dialog: Dialog }
    | { type: 'set_events', events: Array<IAvailability> }
    | { type: 'filter_events', filteredEvents: Array<IAvailability> }

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'set_items':
            return { ...state, items: action.items, filteredItems: action.items }
        case 'set_is_open':
            return { ...state, isOpen: action.isOpen }
        case 'set_filter':
            return {
                ...state,
                isOpen: state.isOpen,
                filter: action.filter,
                filteredItems: search(state.items, action.filter)
            }
        case 'set_selected_items':
            let filteredItems = state.items;
            let openItems = {}
            if ((state.selectedItems[0] && state.selectedItems[0].id) !== action.item.id) {
                filteredItems = search(state.items, action.item.name);
                openItems = { [action.item.id]: true }
            }

            return {
                ...state,
                isOpen: state.isOpen,
                filter: action.filter,
                filteredItems,
                openItems,
                selectedItems: (state.selectedItems[0] && state.selectedItems[0].id) === action.item.id ? [] : [action.item]
            }
        case 'set_open_items':
            return { ...state, openItems: action.openItems }
        case 'set_dialog':
            return { ...state, dialog: action.dialog }
        case 'set_events':
            return { ...state, events: state.events.concat(action.events) }
        case 'filter_events':
            return { ...state, filteredEvents: action.filteredEvents }
        default:
            throw new Error();
    }
}