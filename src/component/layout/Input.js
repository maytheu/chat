import React from "react";

const Input = ({ className, placeholder, type, value, setValue, enter }) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={(e) => (e.key === "Enter" ? enter(e) : null)}
    />
  );
};

export default Input;
