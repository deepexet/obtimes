import React from 'react'
import './AddTime.css'
import { useState } from 'react';
import CheckboxButton from '../../ui/checkbox-button/CheckboxButton';
import { getDatabase, set, get, ref, child } from 'firebase/database';
import { db } from '../../../firebase'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../context/AuthContext';
import firebaseService from '../../../services/firebaseService';
import Calendar from '../template/Calendar/Calendar';
import CustSelect from '../../ui/CustSelect/CustSelect';


const AddTime = ({info, setInfo}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    })
    const { currentUser } = useAuth();

    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };



    const AddHour = (data) => {

        console.log(data)
        
    
        
        const currentDate = new Date();
        data.day_number ? currentDate.setDate(data.day_number) : currentDate.setDate(currentDate.getDate());
        // Обрабатываем данные времени из формы после передаем их в базу данных
        let [startHour, startMinutes] = data.time_start.split(":").map(Number);
        let [endHour, endMinutes] = data.time_end.split(":").map(Number);
        if (!startMinutes) startMinutes = '00';
        if (!endMinutes) endMinutes = '00';

        startHour > 12 ? startHour -= 12 : startHour;
        endHour > 12 ? endHour -= 12 : endHour;


        const startOfWorkDay = new Date(currentDate);
        startOfWorkDay.setHours(data.time_start_type ? startHour : startHour + 12, startMinutes, 0, 0);

        const endOfWorkDay = new Date(currentDate);
        endOfWorkDay.setHours(data.time_end_type ? endHour : endHour + 12, endMinutes, 0, 0);



        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        // for(let i = 1; i < 30; i++){
        //     firebaseService.writeUserData(
        //         currentUser.uid,
        //         formattedDate,
        //         startOfWorkDay.toString(),
        //         endOfWorkDay.toString(),
        //         data.time_start_type ? `${startHour}:${startMinutes} AM` : `${startHour}:${startMinutes} PM`,
        //         data.time_end_type ? `${endHour}:${endMinutes} AM` : `${endHour}:${endMinutes} PM`,
        //     )
        // }

        const totalDayTime = (endOfWorkDay.getTime()/1000) - (startOfWorkDay.getTime()/1000)

        firebaseService.writeUserData(
            currentUser.uid,
            formattedDate,
            startOfWorkDay.toString(),
            endOfWorkDay.toString(),
            data.time_start_type ? `${startHour}:${startMinutes} AM` : `${startHour}:${startMinutes} PM`,
            data.time_end_type ? `${endHour}:${endMinutes} AM` : `${endHour}:${endMinutes} PM`,
            totalDayTime
        )
        // firebaseService.readData()


        setInfo(prevData => [...prevData,[formattedDate,{
            'time_end_full':endOfWorkDay.toString(),
            'time_end_short':data.time_end_type ? `${endHour}:${endMinutes} AM` : `${endHour}:${endMinutes} PM`,
            'time_start_full':startOfWorkDay.toString(),
            'time_start_short': data.time_start_type ? `${startHour}:${startMinutes} AM` : `${startHour}:${startMinutes} PM`,
            'total_day_time': totalDayTime
        }]])
        console.log(info)
        // reset()
    }

    return (
        <>
            <div>
                <button onClick={togglePopup}>Показать попап</button>

                {showPopup ? (
                    <div className="popup">
                        <div className="popup_inner">
                            <h1>Add time:</h1>
                            <form onSubmit={handleSubmit(AddHour)}>
                                {/* <input
                                    type="text" 
                                    placeholder='Day number'
                                    name='day-number'
                                    {...register('day_number', {})}
                                /> */}
                                <CustSelect register={register} name={'day_number'}/>
                                <br />
                                <br />
                                <input
                                    type='text'
                                    placeholder='ex: 8:00 AM'
                                    name='time-start'
                                    {...register('time_start', {})}

                                />
                                <CheckboxButton register={register} name={'time_start_type'} isCheck={true} />

                                <input
                                    type='text'
                                    placeholder='ex: 6:30 PM'
                                    name='time-start'
                                    {...register('time_end', {})}
                                />
                                <CheckboxButton register={register} name={'time_end_type'} />

                                <button className='btn'>Create</button>
                            </form>
                            <button className='close_popup' onClick={togglePopup}>X</button>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default AddTime