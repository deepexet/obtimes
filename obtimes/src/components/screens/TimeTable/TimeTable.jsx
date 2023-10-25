import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { getDatabase, ref, child, get } from 'firebase/database';
import { db } from '../../../firebase'
import SecondToHour from '../template/SecondToHour/SecondToHour';

const TimeTable = ({ data, dateInterval }) => {
    // console.log(dateInterval[0])
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

        if (dateInterval) {
            // console.log(dateInterval)
            data = data.filter(([key, value]) => {
                const entryDate = new Date(key);
                return entryDate >= dateInterval[0] && entryDate <= dateInterval[1];
            });
        }
    }

    // console.log(data)

    let totalTime = 0;

    return (
        <div className="time_block">
            {
                data ?
                    <>
                        <div className="time-info">
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

                        </div>
                        <div className="record total-info">
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
    )
}

export default TimeTable