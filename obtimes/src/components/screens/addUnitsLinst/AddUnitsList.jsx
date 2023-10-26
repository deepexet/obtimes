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
import ReGroupCommercial from './ListType/ReGroupCommercial/rgc';
import SelectTypeList from './SelectTypeList/SelectTypeList';
import ReGroupResidential from './ListType/ReGroupResidential/rgr';
import DexterList from './ListType/Dexter/Dexter';
import CustomList from './ListType/Custom/CustomList';
import { useAuth } from '../../../context/AuthContext';

const Template = () => {

    // const { currentUser } = useAuth();
    // console.log(currentUser.uid) 
    // ===

    // const [dailyData, setdailyData] = useState(null);
    const [error, setError] = useState(null);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await firebaseService.readDailyData();
    //             setdailyData(result);

    //         } catch (err) {
    //             setError(err);x4
    //         }
    //     };
    //     fetchData();
    // }, []);
    // console.log(dailyData)

    const [typeList, setTypeList] = useState('RGC');

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


                            <SelectTypeList setTypeList={setTypeList} />
                            {typeList && (
                                (() => {
                                    switch (typeList) {
                                        case 'default':
                                            return (
                                                <h2>Необходимо выбрать тип добавляемого списка</h2>
                                            );
                                        case 'RGC':
                                            return (
                                                <ReGroupCommercial />
                                            );
                                        case 'RGR':
                                            return (
                                                <ReGroupResidential />
                                            )
                                        case 'Dexter':
                                            return (
                                                <DexterList />
                                            );
                                        case 'RGR':
                                            return (
                                                <ReGroupResidential />
                                            )
                                        case 'Custom':
                                            return (
                                                <CustomList />
                                            );
                                        default:
                                            return null;
                                    }
                                })()
                            )}

                        </div>
                        {/* <Advertise /> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Template