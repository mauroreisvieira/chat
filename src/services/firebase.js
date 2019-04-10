import * as firebase from 'firebase';

export default class Firebase {
    constructor () {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCnYJD53OX0pUMHIGvh_dHQZDJPpEXI_Dk",
                authDomain: "snake-c8e67.firebaseapp.com",
                databaseURL: "https://snake-c8e67.firebaseio.com",
                projectId: "snake-c8e67",
                storageBucket: "snake-c8e67.appspot.com",
                messagingSenderId: "247524654285"
            });
        }
    }

    /**
     * Push in Firabase
     * @param {string} node
     * @param {any}    list
     */
     push(node, list) {
        firebase.database().ref(node).set(list);
    }

    /**
     * Set in Firabase
     * @param {string} node
     * @param {any}    list
     */
     set(node, list) {
        firebase.database().ref(node).set(list);
    }

    /**
     * Updated in Firabase
     * @param {string} node
     * @param {any}    list
     */
     update(node, list) {
        firebase.database().ref(node).update(list);
    }

    /**
     * Get All Items in Firebase
     * @param  {string} node
     * @return {any}
     */
     all(node) {
        var promise = new Promise((resolve, reject) => {
            firebase.app().database().ref(node).on("value", function(snapshot) {
                resolve(snapshot.val());
            });
        });
        return promise;
    }

    destroy(node, key) {
        firebase.database().ref(node).child(key).remove();
    }
}
