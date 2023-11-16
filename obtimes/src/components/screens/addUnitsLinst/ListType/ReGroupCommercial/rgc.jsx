import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import CheckboxLabelCircle from '../../../../ui/checkbox-label-circle/CheckboxLabelCircle'
import firebaseService from '../../../../../services/firebaseService'
import Toast from '../../../../ui/Toast/Toast'

const ReGroupCommercial = () => {
    const [showToast, setShowToast] = useState({ show: false, message: '', error: false });


    const [data, setData] = useState([
        { name: '100-0048', checked: false },
        { name: '100-0050', checked: false },
        { name: '100-0051', checked: false },
        { name: '100-0052', checked: false },
        { name: '100-0056', checked: false },
        { name: '100-0057', checked: false },
        { name: '100-0073', checked: false },
        { name: '100-0220', checked: false },
        { name: '100-0221', checked: false },
        { name: '100-1018', checked: false },
        { name: '100-1019', checked: false },
        { name: '100-1020', checked: false },
        { name: '100-1062', checked: false },
        { name: '100-1063', checked: false },
        { name: '100-1064', checked: false },
        { name: '100-1089', checked: false },
        { name: '100-8075', checked: false },
        { name: '100-8077', checked: false },
        { name: '100-9079', checked: false },
        { name: '200-0062', checked: false },
        { name: '200-0075', checked: false },
        { name: '200-0076', checked: false },
        { name: '200-0106', checked: false },
        { name: '200-0116', checked: false },
        { name: '200-0135', checked: false },
        { name: '200-0248', checked: false },
        { name: '200-0249', checked: false },
        { name: '200-8184', checked: false },
        { name: '200-8185', checked: false },
        { name: '200-9190', checked: false },
        { name: '200-9196', checked: false },
        { name: '200-9204', checked: false },
        { name: '200-0405', checked: false },
        { name: '300-0059', checked: false },
        { name: '300-0066', checked: false },
        { name: '300-0090', checked: false },
        { name: '300-0091', checked: false },
        { name: '300-0095', checked: false },
        { name: '300-0229', checked: false },
        { name: '300-0230', checked: false },
        { name: '300-1002', checked: false },
        { name: '300-1003', checked: false },
        { name: '300-9014', checked: false },
        { name: '300-9096', checked: false },
        { name: '300-9098', checked: false },
        { name: '300-9099', checked: false },
        { name: '300-9100', checked: false },
        { name: '400-0005', checked: false },
        { name: '500-0013', checked: false },
        { name: '500-0014', checked: false },
        { name: '500-0019', checked: false },
        { name: '600-0004', checked: false },
        { name: '600-0005', checked: false },
        { name: '600-0136', checked: false },
        { name: '600-1001', checked: false },
        { name: '600-9009', checked: false },
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
        { name: '999-9075', checked: false },
        { name: 'BTR-0008', checked: false },
        { name: 'PTR-0008', checked: false },
        { name: '4M0496', checked: false },
        { name: '4M0527', checked: false },
        { name: '4M1164', checked: false },
        { name: '4M1191', checked: false },
        { name: '4M5467', checked: false },
        { name: '4M9527', checked: false },
        { name: '4M9533', checked: false },
    ]);

    // console.log(data[0].checked = !data[0].checked)
    useEffect(() => {

        const dataFromLocalStodage = localStorage.getItem('data')
        if(dataFromLocalStodage){
            // setData(JSON.parse(dataFromLocalStodage))
        }

        // let newData = data;
        // newData[2].checked = !data[2].checked;
        // setData(newData)
        // console.log(data)
        // console.log(newData[2].checked)
    }, [])
    useEffect(() => {
        // localStorage.setItem('data', JSON.stringify(data))
        // console.log('data')
    }, [data])

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

        if (units.length === 0) {
            setShowToast({ show: true, message: 'Select at least one unit', error: true });
            setTimeout(() => {
                setShowToast({ show: false, message: '', error: false });
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
            'ReGroup Commercials'
        )
        setShowToast({ show: true, message: 'Data added', error: false });
        setTimeout(() => {
            setShowToast({ show: false, message: '', error: false });
        }, 3000);
        reset()
    }
    return (
        <>
            <h2>ReGroup Commercial</h2>
            {showToast.show && <Toast message={showToast.message} error={showToast.error} />}

            <form onSubmit={handleSubmit(addUnits)}>
                <div className="plates" style={{ gridTemplateRows: `repeat(${Math.ceil(data.length / 3)}, 1fr)` }}>
                   {/* {console.log(data)} */}
                    {
                        data.map((item, index) => (
                            <CheckboxLabelCircle
                                // odd={index % 2 === 0}
                                key={index}
                                data={data}
                                setData={setData}
                                index={index}
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

export default ReGroupCommercial