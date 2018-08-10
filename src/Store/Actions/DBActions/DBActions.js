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
    static userResPush(obj, date){
        return{
            type: actionTypes.USER_RESPONSE_PUSH,
            payload: {obj, date},
        }
    }
    static userResError(errText){
        return{
            type: actionTypes.USER_RESPONSE_PUSH_FAIL,
            payload: errText
        }
    }

    static saveLocation(location){
        return{
            type: actionTypes.SAVE_LOCATION,
            payload: location
        }
    }

    static getTime(){
        return{
            type: actionTypes.GET_TIME
        }
    }

    static getTimeFail(errMsg){
        return{
            type: actionTypes.GET_TIME_FAIL,
            payload: errMsg
        }
    }

    static makeisErrorFalse(){
        return{
            type: actionTypes.MAKE_ISERROR_FALSE
        }
    }
    static userFeedBack(branch,date,key,obj){
        return{
            type:actionTypes.USER_FEEDBACK_PROGRESS,
            payload:{branch,date,key,obj}
        }
    }
    static showLoaderOnUploading(){
        return{
            type:actionTypes.SHOW_LOADER_ON_UPLOADING
        }
    }
    static hideLoaderOnUploading(){
        return{
            type:actionTypes.HIDE_LOADER_ON_UPLOADING
        }
    }
}