import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  getFormikErrorClass,
  getFormikErrorMessage,
} from "../utils/app.formik.error";

const CInput = ({
  type = "text",
  autoComplete = "off",
  value = "",
  checked = null,
  className = "form-control text-dark",
  style = null,
  disabled = false,
  readOnly = false,
  arrayName = "",
  pattern,
  id,
  name,
  rows,
  placeholder,
  error,
  onChange,
  onKeyPress,
  onBlur,
  inputRef = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldType, setFieldType] = useState("");

  const getFieldType = (_type) => {
    if (type === "password") {
      if (showPassword === true) {
        setFieldType("text");
      } else {
        setFieldType(type);
      }
    } else {
      setFieldType(type);
    }
  };

  useEffect(() => {
    getFieldType(type);
  }, []);

  useEffect(() => {
    if (fieldType) {
      getFieldType(fieldType);
    }
  }, [showPassword]);

  return (
    <>
      {type === "textarea" ? (
        <textarea
          type="text"
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
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
          disabled={disabled}
          readOnly={readOnly}
          ref={inputRef}
        />
      ) : (
        <input
          type={fieldType}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={getFormikErrorClass(
            error && error,
            name,
            className,
            "is-invalid",
            arrayName
          )}
          style={style}
          pattern={pattern}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          disabled={disabled}
          readOnly={readOnly}
          ref={inputRef}
        />
      )}
      {type === "password" && (
        <span
          className={getFormikErrorClass(
            error && error,
            name,
            "input-group-text",
            "c-is-invalid",
            arrayName
          )}
        >
          <Icon
            icon="ic:outline-lock"
            width="22"
            height="22"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </span>
      )}

      {type === "email" && (
        <span
          className={getFormikErrorClass(
            error && error,
            name,
            "input-group-text",
            "c-is-invalid",
            arrayName
          )}
        >
          <Icon
            icon="solar:user-circle-linear"
            width="22"
            height="22"
          />
        </span>
      )}

      {getFormikErrorMessage(error && error, name)}
    </>
  );
};

export default CInput;
