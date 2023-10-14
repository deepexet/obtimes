import React, { useEffect, useState } from 'react';
import './CustSelect.css'

const CustSelect = ({register, name}) => {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(currentDate.getDate());

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    // Генерируем массив с числами от 1 до количества дней в месяце
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const formatDate = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return date.toLocaleString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' });
    };


    return (
        <>
            {/* <h2>{formatDate(selectedDate)}</h2> */}
            <div className="container">
                <div className="select-container">
                    <select
                        name={name}
                        id={name}
                        {...register(name, {})}
                        className='select'
                        defaultValue={currentDate.getDate()}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        {daysArray.map((day) => (

                            <option
                                key={day}
                                value={day}
                            >
                                {formatDate(day)}
                            </option>

                        ))}

                    </select>
                </div>

            </div>

        </>
    )
}

export default CustSelect