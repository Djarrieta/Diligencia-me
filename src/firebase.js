import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3HdftMzvcM7FHREPo0fASfHZ13vMJ4Gw",
    authDomain: "diligencia-me-24cb1.firebaseapp.com",
    databaseURL: "https://diligencia-me-24cb1.firebaseio.com",
    projectId: "diligencia-me-24cb1",
    storageBucket: "diligencia-me-24cb1.appspot.com",
    messagingSenderId: "463626954360",
    appId: "1:463626954360:web:029405f382b5c578beef8d"
  };
  // Initialize Firebase
  const f=firebase.initializeApp(firebaseConfig);
  const db=f.firestore();


/*   const db=firebase.initializeApp({
    apiKey: "AIzaSyA3HdftMzvcM7FHREPo0fASfHZ13vMJ4Gw",
    authDomain: "diligencia-me-24cb1.firebaseapp.com",
    databaseURL: "https://diligencia-me-24cb1.firebaseio.com",
    projectId: "diligencia-me-24cb1",
    storageBucket: "diligencia-me-24cb1.appspot.com",
    messagingSenderId: "463626954360",
    appId: "1:463626954360:web:029405f382b5c578beef8d"
  })
  db.firestore()
 */
  export {db};