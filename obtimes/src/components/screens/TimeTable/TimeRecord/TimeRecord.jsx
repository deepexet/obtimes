import React, { useState } from 'react'
import SecondToHour from '../../template/SecondToHour/SecondToHour'
import './TimeRecord.css'

const TimeRecord = ({ date, info }) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div 
        key={date} 
        className={isActive ? 'active record' : 'record'}
        onClick={() => setIsActive(!isActive)}
        >
            <div className='edit_block'>
                {/* <span className='edit'>Edit</span> */}
                <span className='delete'>Del</span>
            </div>
            <div className="date">{date}</div>
            <div className="start">{info.time_start_short}</div>
            <div className="end">{info.time_end_short}</div>
            <div className="total"><SecondToHour seconds={info.total_day_time} /></div>
        </div>
    )
}

export default TimeRecord