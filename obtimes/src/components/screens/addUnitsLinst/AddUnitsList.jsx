import React from 'react'
import axios from 'axios';

import { Link, NavLink } from 'react-router-dom'
import AddTime from '../popup/AddTime'
import firebaseService from '../../../services/firebaseService';
import { useEffect, useState } from 'react'
import Menu from '../menu/Menu';
import TimeTable from '../TimeTable/TimeTable';
import Advertise from '../advertise/Advertise';
import HeadProfile from '../HeadProfile/HeadProfile';
import CheckboxLabelCircle from '../../ui/checkbox-label-circle/CheckboxLabelCircle';
// import awaitfirebaseService from '../../../services/awaitfirebaseService'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../context/AuthContext';

const Template = () => {

    const [data, setData] = useState([
        { name: '100-1064', checked: false },
        { name: '100-1063', checked: false },
        { name: '100-1062', checked: false },
        { name: '100-1068', checked: false },
        { name: '100-0220', checked: false },
        { name: '100-0221', checked: false },
        { name: '100-1070', checked: false },
        { name: '100-1071', checked: false },
        { name: '100-1072', checked: false },
        { name: '100-1073', checked: false },
        { name: '100-1074', checked: false },
        { name: '100-1075', checked: false },
        { name: '100-1076', checked: false },
        { name: '100-1077', checked: false },
        { name: '100-1078', checked: false },
        { name: '100-1079', checked: false },

    ]);

    const { currentUser } = useAuth();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    })


    const addUnits = (data) => {
        let units = [];

        for (let key in data) {
            if (data[key] === true) {
                units.push(key)
            }
        }

        const currentDate = new Date();
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        console.log(currentUser)

        firebaseService.writeUnitsData(
            currentUser.uid,
            JSON.stringify(units),
            formattedDate,
            'ReGroup Commercials'
        )
        reset()
    }

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
      console.log(dailyData)



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
                                <span className='main_text'>Let's go</span>
                                <span className="desc_text">Here you can add different type units list</span>
                            </div>


                            <form onSubmit={handleSubmit(addUnits)}>

                                {
                                    data.map((item, index) => (
                                        <CheckboxLabelCircle
                                            key={index}
                                            isChecked={item.checked}
                                            label={item.name}
                                            register={register}
                                            name={item.name}
                                        />
                                    ))
                                }

                                <br />
                                <button className='btn'>Save</button>
                            </form>


                        </div>
                        {/* <Advertise /> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Template