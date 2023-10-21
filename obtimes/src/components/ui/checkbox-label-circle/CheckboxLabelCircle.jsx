import React from 'react';
import './CheckboxLabelCircle.css';

const CheckboxLabelCircle = ({ label, isChecked, register, name }) => {
  return (
    <label className="checkbox-container">
      <input
        defaultChecked={isChecked}
        type="checkbox"
        className="checkbox-input"
        {...register(name, {})}
      />
      <span className="checkbox-visual">
        {label}
      </span>
    </label>
  );
};

export default CheckboxLabelCircle;
