import React, { useEffect, useState } from 'react';
import firebaseService from '../../../services/firebaseService';
import Menu from '../menu/Menu';
import HeadProfile from '../HeadProfile/HeadProfile';
import './StatisticPersonal.css';
import { useAuth } from '../../../context/AuthContext';
import ListingUnits from '../../ui/listing-units/listingUnits';
import ClipboardButton from '../../ui/ClipboardButton/ClipboardButton';

const StatisticPersonal = () => {
    const { currentUser } = useAuth();
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

    const filteredData = {};

    if (dailyData) {
        console.log(dailyData);
        const sortedEntries = Object.entries(dailyData).sort((a, b) => {
            const dateA = new Date(a[0]);
            const dateB = new Date(b[0]);
            return dateB - dateA;  // Для сортировки от старой даты к новой; используйте `dateB - dateA` для сортировки от новой даты к старой
        });
    
        const sortedData = Object.fromEntries(sortedEntries);

        for (let date in sortedData) {
            if (dailyData[date][currentUser.uid]) {
                filteredData[date] = {
                    [currentUser.uid]: dailyData[date][currentUser.uid]
                };
            }
        }
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

                            {filteredData && Object.keys(filteredData).length > 0 && (
                                <div className='day_list'>
                                    {Object.keys(filteredData).map(day => (
                                        <div key={day} className='day_date'>
                                            <div className='date'>
                                                <p>{day}: </p>
                                                <ClipboardButton dataToCopyRaw={filteredData[day]} customName={'Copy all day'}/>
                                                </div>
                                            {Object.keys(filteredData[day]).map(user => (
                                                <div className="user" key={user}>
                                                    {/* <p className='user_name'>{normalName[user]}</p> */}
                                                    <div className='user_data'>
                                                        {
                                                            Object.keys(filteredData[day][user]).map(company => (
                                                                <div className="company" key={company}>
                                                                    <p>{company}</p>
                                                                    <ListingUnits units={filteredData[day][user][company].units} title={company} />
                                                                    {/* <listing>
                                                                        <button className='copy_clipboard'>Copy</button>
                                                                        {JSON.parse(dailyData[day][user][company].units).map(unit => (
                                                                            <span className='curUnit' key={unit}>{unit}</span> 
                                                                    
                                                                        ))}
                                                                    </listing> */}
                                                                    {/* {units}: {dailyData[day][user]} */}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>

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

export default StatisticPersonal;
