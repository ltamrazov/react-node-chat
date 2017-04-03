import React from 'react';

export const renderField = ({ input, placeholder, type, className, meta: { touched, error, warning } }) => (
  <div>
    <label>{placeholder}:</label>
    <input {...input} placeholder={placeholder} type={type} className={className} />
    {touched && ((error && <span className="alert-danger">{error}</span>) || (warning && <span className="alert-danger">{warning}</span>))}
  </div>
);
