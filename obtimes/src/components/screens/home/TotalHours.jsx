import React from 'react'
import BankingHour from './BankingHour';

const TotalHours = ({hours}) => {
        const sumOfDifferences = hours.reduce((accumulator, obj) => {
                return accumulator + (obj.number_2 - obj.number_1);
            }, 0);
            const limit = 96;
    return (
        <>
        <p>Total hours: {sumOfDifferences} </p>
        {sumOfDifferences > limit ? (<BankingHour limit={limit} sumOfDifferences={sumOfDifferences} />) : (<></>)}
        </>
    )
}

export default TotalHours