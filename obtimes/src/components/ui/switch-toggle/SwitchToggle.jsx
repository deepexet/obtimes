import React from 'react'
import styles from './SwitchToggle.module.css'

const SwitchToggle = ({register, name, isCheck}) => {
    return (
        <span className={styles.toggleWrapper}>
            <input 
            type="checkbox"
            className={styles.switch_check}
            defaultChecked={isCheck}
            {...register(name, {})}
            name={name}
            id={`${name}`}
            />
            <label htmlFor={`${name}`} className={styles.toggle}>
                <span className={styles.toggle__handler}>
                    <span className={`${styles.crater} ${styles.crater_1}`}></span>
                    <span className={`${styles.crater} ${styles.crater_2}`}></span>
                    <span className={`${styles.crater} ${styles.crater_3}`}></span>
                </span>
                <span className={`${styles.star} ${styles.star_1}`}></span>
                <span className={`${styles.star} ${styles.star_2}`}></span>
                <span className={`${styles.star} ${styles.star_3}`}></span>
                <span className={`${styles.star} ${styles.star_4}`}></span>
                <span className={`${styles.star} ${styles.star_5}`}></span>
                <span className={`${styles.star} ${styles.star_6}`}></span>
            </label>
        </span>
    )
}

export default SwitchToggle