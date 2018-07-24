import actionTypes from '../../actionTypes';
import Firebase from 'react-native-firebase';
import { Observable } from 'rxjs';
import FirebaseDB from '../../Firebase/firebaseDB';
import DBActions from '../../Actions/DBActions/DBActions';
import Time from '../../Serivces/httpReq';

export default class DBEpic {
    static getLocations(action$) {
        return action$.ofType(actionTypes.GET_LOCATIONS).switchMap(() => {
            return Observable.fromPromise(FirebaseDB.getLocations()).map((array) => {
                return {
                    type: actionTypes.GET_LOCATIONS_SUCCESS,
                    payload: array
                }
            }).catch(err => {
                return Observalbe.of(DBActions.getLocationsError(err.message))
            })
        })
    }

    static userResPush(action$) {
        return action$.ofType(actionTypes.USER_RESPONSE_PUSH)
            .switchMap(({ payload }) => {
                console.log('payload', payload);
                return Observable.fromPromise(FirebaseDB.pushResponse(payload)).map((data) => {
                    return {
                        type: actionTypes.USER_RESPONSE_PUSH_SUCCESS,
                        payload: data
                    }
                })
                    .catch(err => {
                        return Observable.of(DBActions.userResError(err.message))
                    })
            })
    }

    static getTime(action$) {
        return action$.ofType(actionTypes.GET_TIME)
            .switchMap(() => {
                return Observable.ajax(`http://api.timezonedb.com/v2/get-time-zone?key=FJFC17ZZIX4V&format=json&by=zone&zone=Asia/Karachi`)
                    .pluck('response')
                    .map(data => {
                        

                            let date = dateConvertor(data.formatted)
                            return {
                                type: actionTypes.GET_TIME_SUCCESS,
                                payload: date
                            }
                        
                    })
                    .catch(err => {
                        
                        return Observable.of(DBActions.getTimeFail(err.message));
                    })
                
            })
    }
}

function dateConvertor(dateFromServer) {
    let str = dateFromServer;
    let res = str.slice(0, 11);
    let year = res.slice(0, 4);
    let month = res.slice(5, 7)
    let day = res.slice(8, 10);

    return day + "-" + month + "-" + year
}