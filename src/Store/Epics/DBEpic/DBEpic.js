import actionTypes from '../../actionTypes';
import Firebase from 'react-native-firebase';
import { Observable } from 'rxjs';
import FirebaseDB from '../../Firebase/firebaseDB';
import DBActions from '../../Actions/DBActions/DBActions';



export default class DBEpic {
    static getLocations(action$){
        return action$.ofType(actionTypes.GET_LOCATIONS).switchMap(()=>{
            return Observable.fromPromise(FirebaseDB.getLocations()).map((array)=>{
                return {
                    type:actionTypes.GET_LOCATIONS_SUCCESS,
                    payload:array
                }
            }).catch(err=>{
                return Observalbe.of(DBActions.getLocationsError(err.message))
            })
        })
    }
}