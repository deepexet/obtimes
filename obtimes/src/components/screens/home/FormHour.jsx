import React from 'react'
import { useForm } from 'react-hook-form'
import SwitchToggle from '../../ui/switch-toggle/SwitchToggle'
import { getDatabase, set, get, ref, child } from 'firebase/database';
import { db } from '../../../firebase'
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const FormHour = ({ setHours }) => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  })

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const {currentUser} = useAuth();

  const readData = async () => {
    const dbRef = ref(db, "users/");
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };
  


 const writeUserData = async (email, time_s, time_e,) => {
    await set(ref(db, 'users/' + email), {
      time_start: time_s,
      time_end: time_e,
    });
  };
  

  const AddHour = (data) => {
    console.log('AddHour')
    console.log(data)
    setHours(prev => [...prev, {id: Date.now(), ...data}])
    writeUserData(currentUser.uid, data.number_1, data.number_2)
    readData()
    // setHours(prev => [{id: Date.now(), date: new Date().toLocaleString(), ...data}, ...prev])
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(AddHour)}>
        <input
          placeholder='number 1'
          {...register('number_1', {})}
        />
        <SwitchToggle register={register} name={'time-toggle-1'}/>
        <input
          {...register('number_2', {})}
          placeholder='number 2'
        />
        <SwitchToggle register={register} name={'time-toggle-2'} isCheck={true}/>


        <button className='btn'>Create</button>
      </form>
    </>
  )
}

export default FormHour