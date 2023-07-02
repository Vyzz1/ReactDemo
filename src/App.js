import { useReducer } from "react";
import "./App.css";
import { useRef } from "react";
function App() {
  const inputRef = useRef();
  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [...state, action];
      case "delete":
        return state.filter((item) => item.id !== action.id);
      case "complete":
        return state.map((item) => {
          if (item.id === action.id) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
      default:
        return state;
    }
  };

  let data = [
    {
      id: 1,
      text: "Learn React",
      completed: false,
    },
    {
      id: 2,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 3,
      text: "Learn Node",
      completed: false,
    },
    {
      id: 4,
      text: "Learn Express",
      completed: false,
    },
  ];

  const [todo, SetTodo] = useReducer(reducer, data);
  const handleAdd = () => {
    SetTodo({
      type: "add",
      id: Date.now(),
      text: inputRef.current.value,
      completed: false,
    });
  };
  const handleDelete = (id) => {
    SetTodo({
      type: "delete",
      id: id,
    });
  };
  const handleCompleted = (id) => {
    SetTodo({
      type: "complete",
      id: id,
    });
  };
  return (
    <>
      <ul className="todos">
        {todo.map((value) => (
          <>
            <li
              key={value.id}
              style={{ color: value.completed ? "blue" : "red" }}
              className="todos__item"
            >
              {value.text}
            </li>
            <button onClick={() => handleDelete(value.id)}> Delete</button>
            <button onClick={() => handleCompleted(value.id)}>
              {" "}
              Completed
            </button>
          </>
        ))}
      </ul>
      <input type="text" placeholder="Add todo" ref={inputRef} />{" "}
      <button onClick={handleAdd}>Ok</button>
    </>
  );
}

export default App;
