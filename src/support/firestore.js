import firebase from "./firebase";

import {
    getFirestore,
    getDocs,
    collection as coll,
    onSnapshot,
    doc,
    query,
    setDoc
} from "firebase/firestore";

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
