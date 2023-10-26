import React from 'react'
import './SelectTypeList.css'

const SelectTypeList = ({setTypeList}) => {
    return (
        <>
        <h3>Select type lsit</h3>
        <select
            className='typeList'
            name="typeList"
            id="typeList"
            onChange={(e) => setTypeList(e.target.value)}
            defaultValue={'RGC'}
            >
            <option value="RGC">ReGroup Commercial</option>
            <option value="RGR">ReGroup Resedential</option>
            <option value="Dexter">Dexter</option>
            <option value="Custom">Custom</option>
        </select></>
    )
}

export default SelectTypeList