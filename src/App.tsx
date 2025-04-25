import { useReducer, useRef, useState } from "react";

import "./App.css";

import Task from "./components/Task/Task";
import Modal from "./components/Modal/Modal";
import FormField from "./components/FormField/FormField";
import Button from "./components/Button/Button";

import useFormSubmit from "./hooks/useFormSubmit";

import taskReducer from "./reducers/taskReducer";

const data = [
  { id: 1, title: "Take trash", description: "YESYSEYSEY", complete: false },
  { id: 2, title: "Take trash", description: "YESYSEYSEY", complete: false },
  { id: 3, title: "Take trash", description: "YESYSEYSEY", complete: false },
  { id: 4, title: "Take trash", description: "YESYSEYSEY", complete: false },
];

export interface Task {
  id: number;
  title: string;
  description: string;
  complete: boolean;
}

export interface TaskAction {
  title: string;
  description: string;
  type: string;
  id?: number;
}

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, data);
  const [editableTask, setEditableTask] = useState<Task | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  const submitForm = useFormSubmit([descInputRef, titleInputRef]);

  const completedTodos = tasks.filter((todo) => todo.complete === true);

  const todoCount = tasks.length;
  const completedTodosCount = completedTodos.length;

  const showModalHandler = () => {
    modalRef.current?.showModal();
  };
  const closeModalHandler = () => {
    modalRef.current?.close();
  };

  function taskAddHandler(event: React.FormEvent<HTMLFormElement>) {
    submitForm(event, () => {
      dispatch({
        type: "ADD",
        title: titleInputRef.current?.value.toString() || "",
        description: descInputRef.current?.value || "",
      });
    });
    closeModalHandler();
  }

  function taskEditHandler(event: React.FormEvent<HTMLFormElement>) {
    submitForm(event, () => {
      dispatch({
        type: "EDIT",
        title: titleInputRef.current?.value.toString() || "",
        description: descInputRef.current?.value || "",
        id: editableTask?.id,
      });
    });
    setEditableTask(null);
    closeModalHandler();
  }

  function startTaskEditing(id: number) {
    const filteredEditableTask = tasks.filter((todo) => {
      if (todo.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];

    if (titleInputRef.current) {
      titleInputRef.current.value = filteredEditableTask.title;
    }
    if (descInputRef.current) {
      descInputRef.current.value = filteredEditableTask.description;
    }
    setEditableTask(filteredEditableTask);
    showModalHandler();
  }

  const taskItems = tasks.map((item) => (
    <Task
      key={item.id}
      id={item.id}
      isComplete={item.complete}
      title={item.title}
      description={item.description}
      onTaskAction={dispatch}
      onTaskEdit={startTaskEditing}
    />
  ));

  let taskCompletionText = `${completedTodosCount} ${
    completedTodosCount === 1 ? "task" : "tasks"
  } done out of ${todoCount}`;

  if (todoCount === 0) {
    taskCompletionText = "No tasks. Maybe add some?";
  }

  return (
    <>
      <Modal ref={modalRef} onClose={closeModalHandler}>
        <form onSubmit={editableTask ? taskEditHandler : taskAddHandler}>
          <FormField name="Title" type="text" ref={titleInputRef} />
          <FormField name="Description" type="text" ref={descInputRef} />
          <Button
            type="submit"
            styleType="primary"
            name="Submit"
            className="btn-block"
          />
        </form>
      </Modal>
      <div className="task-header">
        <h1 className="progress-text">{taskCompletionText}</h1>
        <div className="btn-row">
          <Button
            type="submit"
            styleType="primary"
            name="Add Task"
            onClick={showModalHandler}
          />
        </div>
      </div>
      <div className="task-container">{taskItems}</div>
    </>
  );
}

export default App;
