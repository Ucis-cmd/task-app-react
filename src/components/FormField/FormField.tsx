import styles from "./FormField.module.css";

interface FormProps {
  name: string;
  type: string;
  ref: React.RefObject<HTMLInputElement | null>;
}

function FormField({ name, type, ref }: FormProps) {
  const nameLowercase = name.toLowerCase();

  return (
    <>
      <div className={styles.fieldContainer}>
        <label htmlFor={nameLowercase} className={styles.formLabel}>
          {name}
        </label>
        <input type={type} className={styles.formInput} id={nameLowercase} ref={ref}/>
      </div>
    </>
  );
}

export default FormField;
