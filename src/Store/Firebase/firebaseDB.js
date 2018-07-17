import Firebase from 'react-native-firebase';

export default class FirebaseDB {

    static getLocations() {

        return new Promise((res, rej) => {

            Firebase.firestore().collection("Locations").get().then((querySnapshot) => {
                res(snapshotToArray(querySnapshot));
            });
        })

    }

    static pushResponse(obj) {
        return new Promise((res, rej) => {
            Firebase.firestore().collection("Response").doc(obj.location).collection(dateFun()).add(obj)
                .then((docRef) => {
                    console.log('data pushed', docRef)
                    res(true);
                }).catch((err) => {
                    console.log('data not pushed')
                    rej(err);
                })
        })
    }
}
function snapshotToArray(snapshot) {
    var returnArr = [];
    console.log(snapshot)
    snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.data())
        var item = childSnapshot.data();
        item.key = childSnapshot.id;

        returnArr.push(item);
    });
    console.log(returnArr)
    return returnArr;
};


function dateFun(){
    let dateRef = new Date();
    return `${dateRef.getDate()}-${dateRef.getMonth()+1}-${dateRef.getFullYear()}`;    
}