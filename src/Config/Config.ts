import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Configuration du connection typeScript avec firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYv9TqV5ROoBf_kedKMIgz0VbDPAuL1-w",
  authDomain: "authentification-61000.firebaseapp.com",
  projectId: "authentification-61000",
  storageBucket: "authentification-61000.appspot.com",
  messagingSenderId: "291421360257",
  appId: "1:291421360257:web:cf4508e6643a6da7903d80",
  measurementId: "G-N96SPRJZZJ"
};

//Initialiser et exportet la constante auth pour qu'elle soit visible dans
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();