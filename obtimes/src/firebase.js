import { getApps, initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";




const firebaseConfig = {
  apiKey: "AIzaSyArYgCwaC7k97_i8vufn06-h3y3N83qUqg",
  authDomain: "obrien-s-app.firebaseapp.com",
  projectId: "obrien-s-app",
  databaseURL: "https://obrien-s-app-default-rtdb.firebaseio.com",
  storageBucket: "obrien-s-app.appspot.com",
  messagingSenderId: "740242057806",
  appId: "1:740242057806:web:a09468fc0e42fe88de711f",
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig, "ObriensApp");
} else {
  app = getApp("ObriensApp");
}

const db = getDatabase(app);

export {db} ;
export default app;
