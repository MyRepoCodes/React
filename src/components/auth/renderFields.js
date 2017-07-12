import React from 'react';

export const renderField = ({
  input,
  select,
  label,
  type,
  emailErr,
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
      {emailErr ? emailErr : ''}
    </div>
  </div>
)

export const workField = ({
  input,
  select,
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
  </div>
)

export const radioField = ({
  input,
  select,
  label,
  type,
  meta: {
    touched,
    error,
    warning
  }
}) => (<input {...input} placeholder={label} type={type}/>)

export const selectField = ({
  input,
  select,
  label,
  type,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className="form-group">
    <select {...input} className="form-control select-cell" type={type}>
      <option value="" disabled>Select Language</option>
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
    <div className="form-error-msg">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderError = ({
  input,
  select,
  label,
  type,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className="form-error-msg width100 padd-0">
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)
