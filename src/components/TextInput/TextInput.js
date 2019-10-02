import React from 'react';

import './FormInput.css';

const TextInput = props => {

  const inputOptions = {};

  if (props.autoFocus) {
    inputOptions.autoFocus = props.autoFocus;
  }

  if (props.required) {
    inputOptions.required = props.required;
  }

  if (props.onClick) {
    inputOptions.onClick = props.onClick;
  }

  return (
    <div className="FormInputGroup form-group">
      <label htmlFor={`${props.valueKey}Id`} className="sr-only">
        {props.placeholder}
      </label>
      <input
        type={props.type} id={`${props.valueKey}Id`} name={props.valueKey}
        className="FormInput form-control" placeholder={props.placeholder} value={props.value}
        {...inputOptions} onChange={props.valueHandler}
    />
    </div>
  );
};

export default TextInput;