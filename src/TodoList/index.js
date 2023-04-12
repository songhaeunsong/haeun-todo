import React from "react";
import TodoItem from "../TodoItem";
import "./style.css";

const TodoList = ({
  todos,
  onCheckToggle,
  onChangeSelectedTodo,
  isCompleted,
}) => {
  return (
    <div className="todo-list">
      {isCompleted
        ? todos.map(
            (todo) =>
              todo.checked && (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  onCheckToggle={onCheckToggle}
                  onChangeSelectedTodo={onChangeSelectedTodo}
                />
              )
          )
        : todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onCheckToggle={onCheckToggle}
              onChangeSelectedTodo={onChangeSelectedTodo}
            />
          ))}
    </div>
  );
};

export default TodoList;
