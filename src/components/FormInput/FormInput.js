import React from 'react';

import './FormInput.css';

const FormInput = props => {

  return (
    <div className="FormInputGroup form-group">
      <label htmlFor={`${props.valueKey}Id`} className="sr-only">
        {props.placeholder}
      </label>
      <input
        type={props.type} id={`${props.valueKey}Id`} name={props.valueKey}
        className="FormInput form-control" placeholder={props.placeholder} value={props.value}
        {...props} onChange={props.valueHandler}
    />
    </div>
  );
};

export default FormInput;