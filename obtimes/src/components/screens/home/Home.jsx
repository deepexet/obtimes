import React from 'react'
import FormHour from './FormHour'
import { useState } from 'react'
import TotalHours from './TotalHours'
import styles from './Home.module.css'
import Login from '../auth/Login'
import { useAuth } from '../../../context/AuthContext'
import { getAuth, signOut } from 'firebase/auth';
import app from '../../../firebase';

const handleLogout = async () => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const Home = () => {
  const [hours, setHours] = useState([{ id: 0, number_1: 0, number_2: 0 }])
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ?
        <div className={styles.main_wrapper}>
          <div className={styles.container}>
            <div>Home</div>
            <p>Hi, {currentUser.email}. Below you can see your statistic.</p>
            <button onClick={handleLogout}>Logout</button>
            <TotalHours hours={hours} />
            {hours.map(hour => (
                <p key={hour.id}>{hour.number_1} - {hour.number_2}</p>
            ))}
            <FormHour setHours={setHours} />
            {/* <FormHour setHours={setHours}/> */}
          </div>
        </div>
        :
        <Login />}
    </>
  )
}

export default Home