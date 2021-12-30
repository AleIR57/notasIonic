import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
    const firebaseConfig = {
        apiKey: "AIzaSyAQQKrR96haGmB5DnEB0FitFiFBjGivgGQ",
        authDomain: "notas-ed1c2.firebaseapp.com",
        projectId: "notas-ed1c2",
        storageBucket: "notas-ed1c2.appspot.com",
        messagingSenderId: "28721957556",
        appId: "1:28721957556:web:0669b67c3fc54a9588a5e1",
        measurementId: "G-X7L4BE7RGM"
      };

  // Initialize Firebase

    const fb = firebase.initializeApp(firebaseConfig);

    export const db = fb.firestore();

    export const dbStorage = fb.storage();
  
  export default firebaseConfig;
  