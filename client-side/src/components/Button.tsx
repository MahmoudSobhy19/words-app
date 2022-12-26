import React from 'react';
import { ImSpinner8 } from "react-icons/im";

interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonInterface> = ({ className, children, disabled, ...props }) => {
  return(
    <button 
      className={"text-white bg-green-600 w-28 py-2 mx-4 rounded font-semibold focus:outline-none hover:bg-green-500 disabled:opacity-50 " + className} 
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  )
}