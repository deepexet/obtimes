import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import CheckboxLabelCircle from '../../../../ui/checkbox-label-circle/CheckboxLabelCircle'
import firebaseService from '../../../../../services/firebaseService'

const ReGroupCommercial = () => {

    const [data, setData] = useState([
        { name: '100-1064', checked: false },
        { name: '100-1063', checked: false },
        { name: '100-1062', checked: false },
        { name: '100-1068', checked: false },
        { name: '100-0220', checked: false },
        { name: '100-0221', checked: false },
        { name: '100-1070', checked: false },
        { name: '100-1071', checked: false },
        { name: '100-1072', checked: false },
        { name: '100-1073', checked: false },
        { name: '100-1074', checked: false },
        { name: '100-1075', checked: false },
        { name: '100-1076', checked: false },
        { name: '100-1077', checked: false },
        { name: '100-1078', checked: false },
        { name: '100-1079', checked: false },

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
            'ReGroup Commercials'
        )
        reset()
    }
    return (
        <>
            <h2>ReGroupCommercial</h2>

            <form onSubmit={handleSubmit(addUnits)}>

                {
                    data.map((item, index) => (
                        <CheckboxLabelCircle
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

export default ReGroupCommercial