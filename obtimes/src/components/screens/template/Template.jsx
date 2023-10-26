import React from 'react'
import axios from 'axios';
import './template.css'
import { Link, NavLink } from 'react-router-dom'
import AddTime from '../popup/AddTime'
import firebaseService from '../../../services/firebaseService'
import { useEffect, useState } from 'react'
import SecondToHour from './SecondToHour/SecondToHour';
import Menu from '../menu/Menu';
import TimeTable from '../TimeTable/TimeTable';
import Advertise from '../advertise/Advertise';
import HeadProfile from '../HeadProfile/HeadProfile';
// import awaitfirebaseService from '../../../services/awaitfirebaseService'
import { useAuth } from '../../../context/AuthContext';
import Login from '../auth/Login';
import DateIntervalSelector from '../../ui/date-interval-selector/DateIntervalSelector';

const Template = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();


    const firstDay = new Date('2023-08-10');
    const curDate = new Date();
    const diff = (Math.floor((curDate - firstDay) / (1000 * 60 * 60 * 24))) % 14;

        // костыль

    const startDate = new Date(curDate.setDate(curDate.getDate() - diff-1));
    const finalDate = new Date(startDate);
    finalDate.setDate(finalDate.getDate() + 13);

    const [dateInterval, setDateInterval] = useState([startDate, finalDate]);



    useEffect(() => {
        const fetchData = async () => {
            try {

                const uid = 'gr5pq7WYIdOtPwPbXrTQaxSdswj2';  // Здесь ваш UID
                const token = 'AIzaSyArYgCwaC7k97_i8vufn06-h3y3N83qUqg';  // Здесь ваш Firebase Access Token

                const response = await axios.get(`https://obrien-s-app-default-rtdb.firebaseio.com/users/${uid}.json?auth=${token}`);

                console.log(response.data)

                // Преобразование объекта в массив ключ-значение и установка состояния
                setData(Object.entries(response.data));

            } catch (err) {
                setError(err);
                alert(err.message);
            }
        };

        fetchData();
    }, []);






    return (
        <>
            <div className="wrapper">
                < div className='content' >
                    <div className="left_bar">
                        <div className="header">
                            <HeadProfile />
                        </div>
                        <Menu />
                    </div>
                    <div className="right_bar">
                        <div className="header">
                            <span>
                                {document.title}
                            </span>
                        </div>
                        <div className="main_body">
                            <div className="comp_time work_history">
                                <div className="second_header">
                                    <span className='main_text'>Work History</span>
                                    <span className="desc_text">Manage billing information and view receips </span>
                                </div>
                                <AddTime info={data} setInfo={setData} />
                                <DateIntervalSelector setDateInterval={setDateInterval} />
                                <TimeTable dateInterval={dateInterval} data={data} setData={setData} />
                            </div>
                            {/* <Advertise /> */}
                        </div>

                    </div>
                </div >
            </div >
        </>
    )
}

export default Template