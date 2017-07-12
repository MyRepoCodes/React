import React from 'react';

export const inputField = ({
  input,
  label,
  type,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className="form-group">
    <input {...input} placeholder={label} className="form-control" type={type}/>
    <div className="form-error-msg">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
