import React from "react";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const buttonClassName = [
    "btn",
    `btn--${variant}`,
    size === "small" ? "btn--small" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
