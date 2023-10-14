import React from 'react'

const BankingHour = ({sumOfDifferences, limit}) => {
  return (
    <div>BankingHours: {sumOfDifferences - limit}</div>
  )
}

export default BankingHour