import actionTypes from '../actionTypes';
import { startWith } from 'rxjs/operators/startWith';

let INITIAL_STATE = {
    locations: [],
    isError: false,
    errorMessage: "",
    userResponsePush: '',
    isProgress: false,
    currLocation: '',
    date:'',
    userResponseKey:'',
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
            return {...state, isProgress: false, userResponseKey: action.payload};
        case actionTypes.USER_RESPONSE_PUSH_FAIL:
            return {...state, isError: true, isProgress: false, errorMessage: action.payload};

        case actionTypes.SAVE_LOCATION:
            return {...state, currLocation: action.payload};

        case actionTypes.GET_TIME:
            return {...state, isProgress:true};
        case actionTypes.GET_TIME_SUCCESS:
            return {...state, isProgress: false, date:action.payload};
        case actionTypes.GET_TIME_FAIL:
            return {...state, isError: true, errorMessage: action.payload, isProgress:false};

        case actionTypes.MAKE_ISERROR_FALSE:
            return {...state, isError: false};


        case actionTypes.USER_FEEDBACK_PROGRESS:
        return {...state,isProgress:true};
        case actionTypes.USER_FEEDBACK_SUCCESS:
        return {...state,isProgress:false,userResponseKey:''}
        case actionTypes.USER_FEEDBACK_FAIL:
        return {...state,isProgress:false,isError:true,errorMessage:action.payload}

        case actionTypes.SHOW_LOADER_ON_UPLOADING:
        return{...state,isProgress:true};
        case actionTypes.HIDE_LOADER_ON_UPLOADING:
        return{...state,isProgress:false};
        
        default:
            return state;
    }
}