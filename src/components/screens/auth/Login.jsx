// login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../../firebase';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({}); // [1

  const auth = getAuth(app);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      console.log(error)
      // setError
      setError({ message: user.email, result: 'success' })
    } catch (error) {
      // console.log(error)
      setError(error); // [2]
      console.error('Error logging in:', {...error, result: 'error'});
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User logged in with Google:', user);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <div className="auth-form">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      {error?.message && <p className={error?.result == 'success' ? 'success' : 'error'}>{error.message}</p>}
      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={handleGoogleLogin}>Login with Google</button> */}
    </div>
  );
};

export default Login;
