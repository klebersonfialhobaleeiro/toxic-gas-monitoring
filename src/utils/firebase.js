import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAeW-oRdds8R8GpJ08isjYwxD24yH9h8-I",
    authDomain: "sensor-mqs.firebaseapp.com",
    databaseURL: "https://sensor-mqs-default-rtdb.firebaseio.com",
    projectId: "sensor-mqs",
    storageBucket: "sensor-mqs.appspot.com",
    messagingSenderId: "648901119376",
    appId: "1:648901119376:web:97eb7af0816cd1a08b7715"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);