import search from '../helpers/search';

export const initialState = {
    items: [],
    filter: "",
    filteredItems: [],
    selectedItems: [],
    openItems: {},
    isOpen: true,
    dialog: {},
    events: [],
    filteredEvents: []
}

export function reducer(state, action) {
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