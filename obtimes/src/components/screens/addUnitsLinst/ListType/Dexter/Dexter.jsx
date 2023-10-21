import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import CheckboxLabelCircle from '../../../../ui/checkbox-label-circle/CheckboxLabelCircle'
import firebaseService from '../../../../../services/firebaseService'

const DexterList = () => {
    const { currentUser } = useAuth();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    })


    const addUnits = (data) => {

        let units = [];

        if(data.units){
            units = data.units.split('\n')
        } else {
            return false
        }
        const currentDate = new Date();
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        firebaseService.writeUnitsData(
            currentUser.uid,
            JSON.stringify(units),
            formattedDate,
            'Dexter'
        )
        console.log(data)
    }
    return (
        <>
            <h2>Dexter</h2>
            <form onSubmit={handleSubmit(addUnits)}>

                <textarea
                cols="40" 
                rows="10"
                {...register('units', {})}
                ></textarea>
                <br />
                <button className='btn'>Save</button>
            </form>
        </>
    )
}

export default DexterList