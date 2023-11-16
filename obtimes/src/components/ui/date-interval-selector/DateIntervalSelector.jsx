import { set } from 'firebase/database';
import React, { useState } from 'react';
import './DateIntervalSelector.css'

const DateIntervalSelector = ({setDateInterval}) => {
    const firstDay = new Date('2023-08-11');
    const curDate = new Date();
    const diff = (Math.floor((curDate - firstDay) / (1000 * 60 * 60 * 24))) % 14;
    const [startDate, setStartDate] = useState(new Date(curDate.setDate(curDate.getDate() - diff)));


    const handlePreviousClick = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() - 14);
        setStartDate(newStartDate);

        const finalDate = new Date(newStartDate);
        finalDate.setDate(finalDate.getDate() + 13);
        // костыль
        setDateInterval([new Date(newStartDate).setDate(newStartDate.getDate()-1), finalDate])
    };

    const handleNextClick = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 14);
        setStartDate(newStartDate);

        const finalDate = new Date(newStartDate);
        finalDate.setDate(finalDate.getDate() + 13);
        // костыль
        setDateInterval([new Date(newStartDate).setDate(newStartDate.getDate()-1), finalDate])
    };

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 13);

    return (
        <div className='week_selector'>
            <button onClick={handlePreviousClick}>&lt;</button>
            <div className='date_interval'>
                {startDate.toDateString()} - {endDate.toDateString()}
            </div>
            <button onClick={handleNextClick}>&gt;</button>
        </div>
    );
};

export default DateIntervalSelector;
