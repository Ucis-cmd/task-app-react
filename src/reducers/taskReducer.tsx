import { TaskAction } from "../App";
import { Task } from "../App";

export default function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo: Task) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case "ADD":
      return [
        ...state,
        {
          title: action.title,
          id: Math.random() * 10000,
          description: action.description,
          complete: false,
        },
      ];
    case "EDIT":
      return state.map((todo: Task) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            title: action.title,
            description: action.description,
          };
        } else {
          return todo;
        }
      });
    case "DELETE":
      return state.filter((todo: Task) => {
        if (todo.id === action.id) {
          return false;
        }
        return true;
      });
    default:
      return state;
  }
}
