import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import CheckboxLabelCircle from '../../../../ui/checkbox-label-circle/CheckboxLabelCircle'
import firebaseService from '../../../../../services/firebaseService'
import Toast from '../../../../ui/Toast/Toast'


const ReGroupResidential = () => {
    const [showToast, setShowToast] = useState({show: false, message: '', error: false});


    const [data, setData] = useState([
            { name: '200-0078', checked: false },
            { name: '200-0080', checked: false },
            { name: '200-0081', checked: false },
            { name: '200-0082', checked: false },
            { name: '200-0083', checked: false },
            { name: '200-0086', checked: false },
            { name: '200-0087', checked: false },
            { name: '200-0088', checked: false },
            { name: '200-0089', checked: false },
            { name: '200-0093', checked: false },
            { name: '200-0094', checked: false },
            { name: '200-0095', checked: false },
            { name: '200-0099', checked: false },
            { name: '200-0101', checked: false },
            { name: '200-0103', checked: false },
            { name: '200-0104', checked: false },
            { name: '200-0105', checked: false },
            { name: '200-0106', checked: false },
            { name: '200-0107', checked: false },
            { name: '200-0108', checked: false },
            { name: '200-0114', checked: false },
            { name: '200-0115', checked: false },
            { name: '200-0231', checked: false },
            { name: '200-0232', checked: false },
            { name: '200-0234', checked: false },
            { name: '200-1028', checked: false },
            { name: '200-1029', checked: false },
            { name: '200-1030', checked: false },
            { name: '200-1031', checked: false },
            { name: '200-1032', checked: false },
            { name: '200-1033', checked: false },
            { name: '200-1034', checked: false },
            { name: '200-1035', checked: false },
            { name: '200-1036', checked: false },
            { name: '200-1037', checked: false },
            { name: '200-1038', checked: false },
            { name: '200-1039', checked: false },
            { name: '200-1040', checked: false },
            { name: '200-1041', checked: false },
            { name: '200-1042', checked: false },
            { name: '200-1043', checked: false },
            { name: '200-1044', checked: false },
            { name: '200-1045', checked: false },
            { name: '200-2017', checked: false },
            { name: '200-9056', checked: false },
            { name: '400-0018', checked: false },
            { name: '400-0019', checked: false },
            { name: '400-0023', checked: false },
            { name: '400-0153', checked: false },
            { name: '400-0247', checked: false },
            { name: '400-1047', checked: false },
            { name: '400-1048', checked: false },
            { name: '400-1049', checked: false },
            { name: '400-1050', checked: false },
            { name: '400-1051', checked: false },
            { name: '400-6006', checked: false },
            { name: '400-6007', checked: false },
            { name: '500-0015', checked: false },
            { name: '4M0496', checked: false },
            { name: '4M0527', checked: false },
            { name: '4M1164', checked: false },
            { name: '4M1191', checked: false },
            { name: '4M5467', checked: false },
            { name: '4M9527', checked: false },
            { name: '4M9533', checked: false },
            { name: '800-0004', checked: false },
            { name: '999-0012', checked: false },
            { name: '999-0014', checked: false },
            { name: '999-0019', checked: false },
            { name: '999-0021', checked: false },
            { name: '999-0023', checked: false },
            { name: '999-0025', checked: false },
            { name: '999-0026', checked: false },
            { name: '999-0027', checked: false },
            { name: '999-0030', checked: false },
            { name: '999-0031', checked: false },
            { name: '999-0048', checked: false },
            { name: '999-0051', checked: false },
            { name: '999-7075', checked: false },
            { name: '999-8071', checked: false },
            { name: '999-8074', checked: false },
            { name: '999-8075', checked: false },
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

        if(units.length === 0){
            setShowToast({show: true, message:'Select at least one unit', error: true});
            setTimeout(() => {
                setShowToast({show: false, message:'', error: false});
            }, 3000);
            return false
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
        setShowToast({show: true, message:'Data added', error: false});
            setTimeout(() => {
                setShowToast({show: false, message:'', error: false});
            }, 3000);
       
        reset()
    }
    return (
        <>
            <h2>ReGroup Residential</h2>
            {showToast.show && <Toast message={showToast.message} error={showToast.error} />}

            <form onSubmit={handleSubmit(addUnits)}>
                <div className="plates" style={{ gridTemplateRows: `repeat(${Math.ceil(data.length / 3)}, 1fr)`}}>
                {
                    data.map((item, index) => (
                        <CheckboxLabelCircle
                            // odd={index % 2 === 0}
                            key={index}
                            isChecked={item.checked}
                            label={item.name}
                            register={register}
                            name={item.name}
                        />
                    ))
                }
                </div>
            
                <br />
                <button className='btn numbers_submit'>Save</button>
            </form>
        </>
    )
}

export default ReGroupResidential