import actionTypes from '../actionTypes';

let INITIAL_STATE = {
    locations: [],
    isError: false,
    errorMessage: "",
    userResponsePush: '',
    isProgress: false,
    currLocation: ''
}

export default function dbReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload };
        case actionTypes.GET_LOCATIONS_FAIL:
            return { ...state, isError: true, errorMessage: action.payload };

        case actionTypes.USER_RESPONSE_PUSH:
            return {...state, isProgress: true};
        case actionTypes.USER_RESPONSE_PUSH_SUCCESS:
            return {...state, isProgress: false, userResponsePush: 'userResponsePush'};
        case actionTypes.USER_RESPONSE_PUSH_FAIL:
            return {...state, isError: true, isProgress: false}

        case actionTypes.SAVE_LOCATION:
            return {...state, currLocation: action.payload};

        default:
            return state;
    }
}