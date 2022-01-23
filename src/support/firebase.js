import { initializeApp } from "firebase/app";

import {
    getFirestore,
    getDocs,
    collection as coll,
    onSnapshot,
    doc,
    query,
    setDoc
} from "firebase/firestore";


const firebase = initializeApp({
    apiKey: "AIzaSyDXuLtnZVvQCLp6udbA14VhOwdYHYYT8WA",
    authDomain: "fb-test-296ab.firebaseapp.com",
    projectId: "fb-test-296ab",
    storageBucket: "fb-test-296ab.appspot.com",
    messagingSenderId: "981974815589",
    appId: "1:981974815589:web:1ecf66af91fe2b8d1bc78c"
});

const firestore = getFirestore(firebase);


export const documents = async collection => {

    const docs = {};

    const query = await getDocs(coll(firestore, collection));

    query.forEach(doc => {
        docs[doc.id] = doc.data();
    });

    return docs;

}

export const realtime = (collection, document, callback = (data, id) => {}) => {

    return onSnapshot(doc(firestore, collection, document), doc => {
        callback(doc.data(), doc.id);
    });

}

export const realtimeCollection = (collection, callback = (data, id) => {}) => {

    return onSnapshot(query(coll(firestore, collection)), querySnapshot => {
        querySnapshot.forEach(doc => {
            callback(doc.data(), doc.id);
        });
    });

}

export const write = async (collection, document, data = {}) => {

    return await setDoc(doc(firestore, collection, document), data);

}
