import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDytccKbNGiPY7QeKEboMLmix2BRDTkDCw",
  authDomain: "review-system-e8afb.firebaseapp.com",
  projectId: "review-system-e8afb",
  storageBucket: "review-system-e8afb.appspot.com",
  messagingSenderId: "227514896852",
  appId: "1:227514896852:web:39a426a4f084b3f6b5c641",
  measurementId: "G-X5QYD5H8Q0",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };

// export default firebaseApp;
