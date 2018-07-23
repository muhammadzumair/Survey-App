import { Observable } from 'rxjs';


export default class Time {
    static getTime() {
        return Observable.ajax({
            url: `http://api.timezonedb.com/v2/get-time-zone?key=FJFC17ZZIX4V&format=json&by=zone&zone=Asia/Karachi`,
            method: 'GET',
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }
}