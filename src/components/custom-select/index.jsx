import React from 'react'
import { getFormikErrorClass, getFormikErrorMessage } from '../../components/utils/app.formik.error';

function CSelect({ type = "select", autoComplete = "off", value = "", className = "form-select", options = [], defaultOption = "", optionLabel = 'label', optionValue = "value", id, name, onChange, onBlur, error, disabled, arrayName }) {

  const truncateText = (text) => {
    if (text.length > 40) {
      return text.substring(0, 40) + '...';
    }
    return text;
  };

  return (
    <>
      <select
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        autoComplete={autoComplete}
        className={getFormikErrorClass(
          error && error,
          name,
          className,
          "is-invalid",
          arrayName
        )}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options && options.map((item, k) =>
          <option key={k} value={item[optionValue]}>{truncateText(item[optionLabel])}</option>
        )}
      </select>
      {getFormikErrorMessage(error && error, name)}
    </>
  )
}

export default CSelect