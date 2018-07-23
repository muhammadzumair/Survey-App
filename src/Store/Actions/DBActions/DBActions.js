import actionTypes from '../../actionTypes';

export default class DBActions{
    static getLocationFromFirebase(){
        return {
            type:actionTypes.GET_LOCATIONS
        }
    }
    static getLocationsError(message){
        return {
            type:actionTypes.GET_LOCATIONS_FAIL,
            payload:message
        }
    }
    static userResPush(obj){
        return{
            type: actionTypes.USER_RESPONSE_PUSH,
            payload: obj
        }
    }
    static userResError(errText){
        return{
            type: actionTypes.USER_RESPONSE_PUSH_FAIL,
            payload: errText
        }
    }
}