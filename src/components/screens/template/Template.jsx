import React from 'react'
import axios from 'axios';
import './template.css'
import { Link } from 'react-router-dom'
import AddTime from '../popup/AddTime'
import firebaseService from '../../../services/firebaseService'
import { useEffect, useState } from 'react'
import SecondToHour from './SecondToHour/SecondToHour';
// import awaitfirebaseService from '../../../services/awaitfirebaseService'

const Template = () => {

    // const dataUser = firebaseService.readData('gr5pq7WYIdOtPwPbXrTQaxSdswj2')
    // // dataUser.map(date => console.log(date.time_start_short))
    // console.log(dataUser)
    // Object.keys(dataUser).forEach(function(key, index) {
    //     console.log(key)
    //   });



    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const uid = 'gr5pq7WYIdOtPwPbXrTQaxSdswj2';  // Здесь ваш UID
                const token = 'AIzaSyArYgCwaC7k97_i8vufn06-h3y3N83qUqg';  // Здесь ваш Firebase Access Token

                const response = await axios.get(`https://obrien-s-app-default-rtdb.firebaseio.com/users/${uid}.json?auth=${token}`);

                // Преобразование объекта в массив ключ-значение и установка состояния
                setData(Object.entries(response.data));

                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);   // Пустой массив зависимостей означает, что эффект будет запущен только при монтировании

    function parseDate(dateString) {
        return new Date(dateString);
    }

    // Сортируем массив по датам

    if (data) {
        data.sort(function (a, b) {
            var dateA = parseDate(a[0]);
            var dateB = parseDate(b[0]);
            return dateA - dateB;
        });
    }

    // console.log(data)
    // console.log(error)

    let totalTime = 0;

    return (
        <div className="wrapper">
            <div className='content'>
                <div className="left_bar">
                    <div className="header">
                        <div className="profile_box">
                            <div className="photo">
                                <img src="/img/me.jpeg" alt="" />
                            </div>
                            <div className="name">
                                <span>Valerii Serhieiev</span>
                                <span className='log'>@deepexet</span>
                            </div>
                        </div>

                    </div>
                    <div className="menu">
                        <ul>
                            <li className='link icon general'>
                                <Link rel="stylesheet" to="/general">General</Link>
                            </li>
                            <li className='link icon lock'>Password</li>
                            <li className='link icon notes'>Work notes</li>
                            <li className='active link icon work'>Work History</li>
                            <li className='link icon charts'>Charts</li>
                        </ul>
                    </div>
                </div>
                <div className="right_bar">
                    <div className="header">
                        <span>
                            Billing
                        </span>
                    </div>
                    <div className="main_body">
                        <div className="comp_time">
                            <div className="second_header">
                                <span className='main_text'>Work History</span>
                                <span className="desc_text">Manage billing information and view receips </span>
                            </div>
                            <AddTime info={data} setInfo={setData} />
                            <div className="time_block">
                                {
                                    data ?
                                        <>
                                            <div className="record headers">
                                                <div className="date">Date</div>
                                                <div className="start">Start</div>
                                                <div className="end">End</div>
                                                <div className="total">Total</div>
                                            </div>
                                            {

                                                data.map(([date, info]) => {
                                                    totalTime += info.total_day_time;
                                                    return (<div key={date} className="record">
                                                        <div className="date">{date}</div>
                                                        <div className="start">{info.time_start_short}</div>
                                                        <div className="end">{info.time_end_short}</div>
                                                        <div className="total"><SecondToHour seconds={info.total_day_time} /></div>
                                                    </div>)

                                                })
                                            }
                                            <div className="record">
                                                <div className="date">Total</div>
                                                <div className="start">-</div>
                                                <div className="end">-</div>
                                                <div className="total"><SecondToHour seconds={totalTime} /></div>
                                            </div>
                                        </>
                                        :
                                        <div className="empty_data">
                                            No data yet
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="advertise" style={{ display: 'none' }}>
                            <div className="promo">
                                <div className="sub_title">
                                    Your plan
                                </div>
                                <div className="title">
                                    Pro Annual
                                </div>
                                <div className="sub_title">
                                    Renews on  Nov. 2021
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Template