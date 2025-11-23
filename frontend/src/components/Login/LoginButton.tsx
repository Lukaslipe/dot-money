// src/components/Login/LoginButton.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './LoginButton.module.css'; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; 
}

const LoginButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.loginButton} {...props}>
      {children}
    </button>
  );
};

export default LoginButton;