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
            Firebase.firestore().collection("Response").doc(obj.obj.location).collection(obj.date).add(obj.obj)
                .then((docRef) => {
                    console.log('data pushed', docRef.id)
                    res(docRef.id);
                }).catch((err) => {
                    console.log('data not pushed')
                    rej(err);
                })
        })
    }
    static userFeeeBack(branch, date, key, obj) {
        return new Promise((res, rej) => {
            Firebase.firestore().collection("Response").doc(branch).collection(date).doc(key).update(obj).then(() => {
                res(true)
            }).catch(err => {
                rej(err)
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


function dateFun() {
    let dateRef = new Date();
    return `${dateRef.getDate()}-${dateRef.getMonth() + 1}-${dateRef.getFullYear()}`;
}