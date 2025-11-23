// src/components/Login/LoginInput.tsx
import React, { InputHTMLAttributes } from 'react';
import styles from './LoginInput.module.css';

// Estende todas as props nativas de um input HTML e adiciona o 'label'.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; 
}

const LoginInput: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      {/* O 'id' conecta o label ao input para acessibilidade */}
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      {/* Aplica a classe do Módulo CSS */}
      <input id={id} className={styles.loginInput} {...props} />
    </div>
  );
};

export default LoginInput;