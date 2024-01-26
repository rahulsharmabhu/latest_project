import React from "react";

function Button({
  style="",
  size = "",
  color = "",
  social = "",
  type="",
  hide="",

    outline,
    link,
    block,
    className,
    children,
    disabled,
   
    square,
    pill,
    icon,
    
    loading,
    tabIndex,
    isDropdownToggle,
    isOption,
    rootRef,
    to,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    name,
   
  customclass = "options",
}) {
  return (
    <button type={type} className={`ms-2 btn ${color} btn-${size} mb-2 ${style}`}>
      {name}
    </button>
  );
}

export default Button;
