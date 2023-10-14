import React from 'react'
import styles from './CheckboxButton.module.css'

const CheckboxButton = ({ register, name, isCheck, placeholder }) => {
    return (
        <>
            <label className={styles.checkbox_green}>
                <input
                name={name}
                type="checkbox"
                defaultChecked={isCheck} 
                id={`${name}`}
                {...register(name, {})}
                />
                <span className={styles.checkbox_green_switch} data-label-on="AM" data-label-off="PM"></span>
            </label>
        </>
    )
}

export default CheckboxButton