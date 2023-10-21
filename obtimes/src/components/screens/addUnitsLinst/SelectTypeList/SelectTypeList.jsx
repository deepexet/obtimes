import React from 'react'

const SelectTypeList = ({setTypeList}) => {
    return (
        <select
            name="typeList"
            id="typeList"
            onChange={(e) => setTypeList(e.target.value)}
            defaultValue={'RGC'}
            >
            <option value="RGC">ReGroup Commercial</option>
            <option value="RGR">ReGroup Resedential</option>
            <option value="Dexter">Dexter</option>
            <option value="Custom">Custom</option>
        </select>
    )
}

export default SelectTypeList