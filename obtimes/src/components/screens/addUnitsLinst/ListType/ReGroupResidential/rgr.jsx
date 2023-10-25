import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import CheckboxLabelCircle from '../../../../ui/checkbox-label-circle/CheckboxLabelCircle'
import firebaseService from '../../../../../services/firebaseService'


const ReGroupResidential = () => {

    const [data, setData] = useState([
        { name: '100-1234', checked: false },
        { name: '100-5678', checked: false },
        { name: '100-9012', checked: false },
        { name: '100-3456', checked: false },
        { name: '100-7890', checked: false },
        { name: '100-2345', checked: false },
        { name: '100-6789', checked: false },
        { name: '100-0123', checked: false },
        { name: '100-4567', checked: false },
        { name: '100-8901', checked: false },
        { name: '100-2345', checked: false },
        { name: '100-6789', checked: false },
        { name: '100-0123', checked: false },
        { name: '100-4567', checked: false },
        { name: '100-8901', checked: false },
        { name: '100-2345', checked: false },
        { name: '100-6789', checked: false },

    ]);

    const { currentUser } = useAuth();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    })

    const addUnits = (data) => {
        let units = [];

        for (let key in data) {
            if (data[key] === true) {
                units.push(key)
            }
        }

        const currentDate = new Date();
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        console.log(currentUser)

        firebaseService.writeUnitsData(
            currentUser.uid,
            JSON.stringify(units),
            formattedDate,
            'ReGroup Residential'
        )
        reset()
    }
    return (
        <>
            <h2>ReGroup Residential</h2>

            <form onSubmit={handleSubmit(addUnits)}>

                {
                    data.map((item, index) => (
                        <CheckboxLabelCircle
                            odd={index % 2 === 0}
                            key={index}
                            isChecked={item.checked}
                            label={item.name}
                            register={register}
                            name={item.name}
                        />
                    ))
                }

                <br />
                <button className='btn'>Save</button>
            </form>
        </>
    )
}

export default ReGroupResidential