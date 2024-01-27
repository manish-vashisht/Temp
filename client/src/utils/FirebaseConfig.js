import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCkTdEjqm6dJeMHR71_xHjJU4_7Eot7a08",
    authDomain: "whatsapp-clone-915ba.firebaseapp.com",
    projectId: "whatsapp-clone-915ba",
    storageBucket: "whatsapp-clone-915ba.appspot.com",
    messagingSenderId: "937182265923",
    appId: "1:937182265923:web:956dd5782c65a91ceccaf6",
    measurementId: "G-F5SXLLN6V7"
};

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)