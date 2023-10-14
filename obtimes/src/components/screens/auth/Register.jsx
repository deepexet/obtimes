import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyArYgCwaC7k97_i8vufn06-h3y3N83qUqg",
    authDomain: "obrien-s-app.firebaseapp.com",
    projectId: "obrien-s-app",
    storageBucket: "obrien-s-app.appspot.com",
    messagingSenderId: "740242057806",
    appId: "1:740242057806:web:a09468fc0e42fe88de711f"
  };

const app = initializeApp(firebaseConfig);

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered: ", user);
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
