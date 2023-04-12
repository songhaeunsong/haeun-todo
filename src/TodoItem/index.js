import React from "react";
import { BsEmojiHeartEyes, BsCircle } from "react-icons/bs";
import "./style.css";

const TodoItem = ({ todo, onCheckToggle, onChangeSelectedTodo }) => {
  const { id, text, subtext, tags, date, checked } = todo;
  return (
    <div className="todo-item">
      <div className={`content ${checked ? "checked" : ""}`}>
        {checked ? (
          <BsEmojiHeartEyes
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        ) : (
          <BsCircle
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        )}
        <div
          className="text"
          onClick={() => {
            onChangeSelectedTodo(todo);
          }}
        >
          <p className="list--text">{text}</p>
          <p className="list--subtext">{subtext}</p>
          <p className="list--subtext">{tags}</p>
          <p className="list--date">{date}</p>
        </div>
      </div>
    </div>
  );
};
export default TodoItem;
