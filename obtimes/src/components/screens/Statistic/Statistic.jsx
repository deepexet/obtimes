import React, { useEffect, useState } from 'react';
import firebaseService from '../../../services/firebaseService';
import Menu from '../menu/Menu';
import HeadProfile from '../HeadProfile/HeadProfile';
import './Statistic.css';

const Statistic = () => {
    const [dailyData, setdailyData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await firebaseService.readDailyData();
                setdailyData(result);
            } catch (err) {
                setError(err);
            }
        };
        fetchData();
    }, []);
    const [dailyInfo, setDailyInfo] = useState(null);


    if (dailyData) {
        console.log(dailyData)
    }
    const normalName = {
        'gr5pq7WYIdOtPwPbXrTQaxSdswj2': 'Valerii',
        'GJ1F2YOfIrXYrcIHEnqbSYcxiq62': 'Brandon',
    }



    return (
        <div className="wrapper">
            <div className='content'>
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
                        <div className="comp_time">
                            <div className="second_header">
                                <span className='main_text'>Total statistic for daily work</span>
                                <span className="desc_text">Here you can manage all work info for today</span>
                            </div>

                            {dailyData && Object.keys(dailyData).length > 0 && (
                                <div className='day_list'>
                                    {Object.keys(dailyData).map(day => (
                                        <div key={day} className='day'>
                                            <p className='date'>{day}: {dailyData.day} </p>
                                            {Object.keys(dailyData[day]).map(user => (
                                                <p className="user">
                                                    <p className='user_name'>{normalName[user]}</p>
                                                    <div className='user_data'>
                                                        {
                                                            Object.keys(dailyData[day][user]).map(company => (
                                                                <p className="company">
                                                                    {company}
                                                                    {/* {JSON.parse(dailyData[day][user][company].units)} */}
                                                                    {/* {units}: {dailyData[day][user]} */}
                                                                </p>
                                                            ))
                                                        }
                                                    </div>
                                                </p>

                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                        {/* <Advertise /> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Statistic;
