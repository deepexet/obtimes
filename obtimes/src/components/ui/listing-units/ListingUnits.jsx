import React from 'react'
import ClipboardButton from '../ClipboardButton/ClipboardButton'

const ListingUnits = ({units, title}) => {
    let dataToCopy = title + ":\n";
    JSON.parse(units).map(unit => (
        dataToCopy += unit + '\n'
    ))
    return (
        <listing>
            <ClipboardButton dataToCopy={dataToCopy}/>
            {JSON.parse(units).map(unit => (
                <span className='curUnit' key={unit}>{unit}</span>

            ))}
        </listing>
    )
}

export default ListingUnits