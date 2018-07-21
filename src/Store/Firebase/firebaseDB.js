import Firebase from 'react-native-firebase';

export default class FirebaseDB {

    static getLocations() {

        return new Promise((res, rej) => {

            Firebase.firestore().collection("Locations").get().then((querySnapshot) => {
                res(snapshotToArray(querySnapshot));
            });
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