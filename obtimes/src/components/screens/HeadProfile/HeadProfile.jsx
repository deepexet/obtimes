import React from 'react'
import './HeadProfile.css'
import { getAuth, signOut } from 'firebase/auth';
import app from '../../../firebase';

const HeadProfile = () => {
    const handleLogout = async () => {
        const auth = getAuth(app);
        try {
          await signOut(auth);
          console.log('User signed out');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
    return (
      <>
      <div className='main_logo'>
        <img src="https://www.obriensfasterblaster.com/wp-content/themes/fasterblaster/img/obriens-faster-blaster-mobile-wash-halifax-dartmouth-nova-scotia.jpg" alt="" />
      </div>
      <div className="profile_box">
            <div className="photo">
              {/* <img src="" alt="" /> */}
                {/* <img src="/img/me.jpeg" alt="" /> */}
            </div>
            <div className="name">
                <span>Valerii Serhieiev</span>
                {/* <span className='log'>@deepexet</span> */}
                {/* <span className='log'>Bank: 22 h</span> */}
                <button className='log_out' onClick={handleLogout}>Logout</button>
            </div>
        </div>
      </>
        
    )
}

export default HeadProfile