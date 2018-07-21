import actionTypes from '../actionTypes';

let INITIAL_STATE = {
    locations: [],
    isError: false,
    errorMessage: ""
}

export default function dbReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload };
        case actionTypes.GET_LOCATIONS_FAIL:
            return { ...state, isError: true, errorMessage: action.payload }

        default:
            return state;
    }
}