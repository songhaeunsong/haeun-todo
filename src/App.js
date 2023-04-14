import React, { useEffect, useState } from "react";
import "./App.css";
import Template from "./Template";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const onInputTodo = (text, subtext, tags, date) => {
    if (text === "") {
      return alert("제목을 입력해주세요!");
    } else {
      let uuid = uuidv4();
      const todo = {
        id: uuid,
        text,
        subtext,
        tags,
        date,
        checked: false,
      };
      setTodos([todo, ...todos]);
    }
  };

  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onRemove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    setSelectedTodo(null);
  };
  const onCheckedRemove = () => {
    setTodos((todos) => todos.filter((todo) => todo.checked == false));
  };

  const onUpdate = (id, text, subtext, tags, date) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, subtext, tags, date } : todo
      )
    );
    setSelectedTodo(null);
  };

  useEffect(() => {
    Promise.all([fetch("/list.json"), fetch("/list2.json")])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => setTodos([...data1, ...data2]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Template>
      <TodoInput
        selectedTodo={selectedTodo}
        onInputTodo={onInputTodo}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
      <container>
        <TodoList
          isCompleted={isCompleted}
          todos={todos}
          onCheckToggle={onCheckToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
        <div className="filter">
          <button
            className="filter__completed-btn"
            type="button"
            onClick={() => setIsCompleted(!isCompleted)}
          >
            {isCompleted ? `All` : `완료된 일 보기`}
          </button>
          {isCompleted ? (
            <button
              className="filter__completed-btn"
              onClick={() => {
                onCheckedRemove();
              }}
            >
              완료된 일 일괄 삭제
            </button>
          ) : (
            ``
          )}
        </div>
      </container>
    </Template>
  );
}

export default App;
