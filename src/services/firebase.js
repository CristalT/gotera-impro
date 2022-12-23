import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "src/config/firebase.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use Firestore as Database
const db = getFirestore(app);

export const all = async (collectionName) => {
  return getDocs(collection(db, collectionName)).then((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return docs;
  });
};

export const create = (collectionName, body) => {
  return addDoc(collection(db, collectionName), body);
};

export const remove = (collectionName, documentId) => {
  return deleteDoc(doc(db, collectionName, documentId));
};
