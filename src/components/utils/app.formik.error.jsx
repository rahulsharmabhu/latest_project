/** Only Frontend Validation **/

// export const getFormikErrorClass = (obj, name, base = "", str = "") => {
//     return (obj && obj.touched[name]) && Boolean(obj && obj.errors[name])
//         ? `${base} ${str}`
//         : base;
// };

// export const getFormikErrorMessage = (obj, name) => {
//     return (obj && obj.touched[name]) && Boolean(obj && obj.errors[name]) &&
//         <div className="invalid-feedback d-block">{obj && obj.errors[name]}</div>
// };

/** Validation with backend **/
export const getFormikErrorClass = (
  obj,
  name,
  base = "",
  str = "",
  arrayName
) => {
  let error = null;
  if (!obj) {
    return base;
  }
  if (obj && obj.type === "formik") {
    error = Boolean(obj && obj.error[name]);
  } else {
    let message = obj && obj.error;
    if (message) {
      error = message[name] && message[name][0];
    }
  }
  return error ? `${base} ${str}` : base;
};

export const getFormikErrorMessage = (obj, fieldName) => {
  if (!obj) return "";

  if (obj.type === "formik") {
    let message = obj.error;
    if (!message) return "";

    let touched = message?.touched;
    let errors = message?.errors;

    let error = touched && touched[fieldName] && errors && errors[fieldName];
    return error ? (
      <div className="invalid-feedback d-block">{error}</div>
    ) : null;
  } else {
    let message = obj.error;
    if (!message) return "";

    let error = message[fieldName];
    return error ? (
      <div className="invalid-feedback d-block">{error}</div>
    ) : null;
  }
};