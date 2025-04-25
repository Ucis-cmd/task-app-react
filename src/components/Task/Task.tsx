import { TaskAction } from "../../App";

import styles from "./Task.module.css";

import Button from "../Button/Button";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  onTaskAction: (action: TaskAction) => void;
  onTaskEdit: (id: number) => void;
}

export default function Task({
  id,
  title,
  description,
  isComplete,
  onTaskAction,
  onTaskEdit
}: TaskProps) {
  function handleTaskComplete() {
    onTaskAction({
      type: "COMPLETE",
      id: id,
      title: title,
      description: description,
    }); //have to learn generics or something
  }

  function handleTaskDelete() {
    onTaskAction({
      type: "DELETE",
      id: id,
      title: title,
      description: description,
    });
  }

  function handleTaskEdit() {
    onTaskEdit(id);
  }

  return (
    <>
      <div className={styles.task}>
        <h1>{title}</h1>
        <div className={styles["row-btn"]}>
          <Button
            onClick={handleTaskDelete}
            name="Delete"
            type="button"
            styleType="primary"
          />
          <Button
            onClick={handleTaskEdit}
            styleType="primary"
            type="button"
            name="Edit"
          />
        </div>
        <p>{description}</p>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={handleTaskComplete}
          checked={isComplete}
        ></input>
      </div>
    </>
  );
}
