import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "critical" | "primary" | "outline";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const classes = `btn btn-${variant} ${fullWidth ? "btn-full" : ""} ${className}`;

  return (
    <button className={classes.trim()} {...props}>
      {children}
    </button>
  );
};
