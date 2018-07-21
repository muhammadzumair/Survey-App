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
}