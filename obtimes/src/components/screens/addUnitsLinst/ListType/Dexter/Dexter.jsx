import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import CheckboxLabelCircle from '../../../../ui/checkbox-label-circle/CheckboxLabelCircle'
import firebaseService from '../../../../../services/firebaseService'
import Toast from '../../../../ui/Toast/Toast'


const DexterList = () => {
    const [showToast, setShowToast] = useState({show: false, message: '', error: false});

    const { currentUser } = useAuth();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    })


    const addUnits = (data) => {

        let units = [];

        if(data.units){
            units = data.units.split('\n')
        } else {
            setShowToast({show: true, message:'Set at least one unit', error: true});
            setTimeout(() => {
                setShowToast({show: false, message:'', error: false});
            }, 3000);
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
        setShowToast({show: true, message:'Data added', error: false});
            setTimeout(() => {
                setShowToast({show: false, message:'', error: false});
            }, 3000);
        reset()
    }
    return (
        <>
            <h2>Dexter</h2>
            <form onSubmit={handleSubmit(addUnits)} className='unit_form'>
            {showToast.show && <Toast message={showToast.message} error={showToast.error} />}

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