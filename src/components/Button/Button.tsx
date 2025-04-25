import styles from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  styleType: string;
  name: string;
  onClick?: () => void;
  className?: string;
}

function Button({ styleType, type, name, onClick, className }: ButtonProps) {  
  const buttonStyles = `${className ? className : ""} ${styles.btn} ${styles[styleType]} `;
  return <button type={type} onClick={onClick} className={buttonStyles}>{name}</button>;
}

export default Button;
