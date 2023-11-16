import React from 'react';
import './CheckboxLabelCircle.css';

const CheckboxLabelCircle = ({ label, isChecked, register, name, odd, index, setData,data }) => {
  const handleCheckboxChange = (index) => {
    // setData(prevData => {
    //   console.log(prevData)
    //   const newData = [...prevData];
    //   newData[index].checked = !newData[index].checked;
    //   return newData;
    // });
    let newData = data;
    newData[index].checked = !data[index].checked;
    setData(newData)
    // console.log(newData)
  }
  return (
    <label className={odd ? 'left checkbox-container' : ' right checkbox-container'}>
      <input
        defaultChecked={isChecked}
        type="checkbox"
        className="checkbox-input"
        {...register(name, {})}
        onChange={() => handleCheckboxChange(index)} 
      />
      <span className="checkbox-visual">
        {label}
      </span>
    </label>
  );
};

export default CheckboxLabelCircle;
