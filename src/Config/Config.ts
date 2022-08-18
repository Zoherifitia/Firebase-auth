import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Configuration du connection typeScript avec firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqZkcA-cCmVsPU2iukuoa1g_pekoyBBgE",
  authDomain: "auth-el1p2.firebaseapp.com",
  projectId: "auth-el1p2",
  storageBucket: "auth-el1p2.appspot.com",
  messagingSenderId: "818724848212",
  appId: "1:818724848212:web:6e4448886c539c8bcba3c1"
};

//Initialiser et exportet la constante auth pour qu'elle soit visible dans
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();