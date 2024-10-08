import React from 'react';
import './styles.scss';

const FormSelect = ({
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className='formRow'>
      {label && <label className='formLabel'>{label}</label>}

      <select
        className='formSelect'
        value={defaultValue}
        onChange={handleChange}
        {...otherProps}
      >
        {options.map((option, idx) => {
          const { value, name } = option;

          return (
            <option key={idx} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
