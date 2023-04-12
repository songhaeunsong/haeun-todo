import React, { useState, useEffect, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TiPencil, TiTrash } from "react-icons/ti";
import "./style.css";

const TodoInput = ({ onInputTodo, selectedTodo, onRemove, onUpdate }) => {
  const [text, setText] = useState("");
  const [subtext, setSubtext] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState("");
  const [tagError, setTagError] = useState(false);

  const textChange = (e) => {
    setText(e.target.value);
  };
  const subtextChange = (e) => {
    setSubtext(e.target.value);
  };

  const tagChange = useCallback((e) => {
    setTag(e.target.value);
  }, []);

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const onAddTags = useCallback(
    (e) => {
      e.preventDefault();
      if (tag !== "") {
        if (tags.includes(tag) === true) {
          setTagError(true);
          setTimeout(() => setTagError(false), 1500);
        } else {
          setTags(tags.concat(tag));
          setTag("");
        }
      }
    },
    [tag, tags]
  );

  const onRemoveTag = useCallback(
    (item) => {
      setTags(tags.filter((Tag) => Tag !== item));
    },
    [tags]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    onInputTodo(text, subtext, tags, date);
    setText("");
    setSubtext("");
    setTag("");
    setDate("");
    setTags([]);
  };

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setSubtext(selectedTodo.subtext);
      setTags(selectedTodo.tags);
      setDate(selectedTodo.date);
    }
  }, [selectedTodo]);

  return (
    <div className="todo-insert">
      {selectedTodo ? (
        <form
          className="rewrite"
          onSubmit={() => {
            onUpdate(selectedTodo.id, text, subtext, tags, date);
          }}
        >
          <input
            requiered
            placeholder="수정사항을 입력하세요."
            value={text}
            onChange={textChange}
          />
          <input
            requiered
            placeholder="상세설명..."
            value={subtext}
            onChange={subtextChange}
          />
          <input placeholder="태그" onChange={tagChange} value={tag} />
          <button className="rewrite-tag-btn" onClick={onAddTags}>
            태그 추가
          </button>
          {tagError && <div className="tag-error">태그가 중복되었습니다.</div>}
          <div className="tags">
            {tags.map((item) => (
              <div
                className="tag_item"
                key={item}
                onClick={() => onRemoveTag(item)}
              >
                #{item}
              </div>
            ))}
          </div>
          <p className="dueD">마감 목표일</p>
          <input id="date" type="date" value={date} onChange={dateChange} />

          <div>
            <TiPencil
              onClick={() => {
                onUpdate(selectedTodo.id, text, subtext, tags, date);
                setText("");
                setSubtext("");
                setDate("");
              }}
            />
            <TiTrash
              onClick={() => {
                onRemove(selectedTodo.id);
                setText("");
                setSubtext("");
                setDate("");
              }}
            />
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            requiered
            placeholder="제목을 입력하세요."
            value={text}
            onChange={textChange}
          />
          <input
            requiered
            placeholder="상세설명..."
            value={subtext}
            onChange={subtextChange}
          />

          <input placeholder="태그" onChange={tagChange} value={tag} />
          <button className="tag-btn" onClick={onAddTags}>
            태그 추가
          </button>
          {tagError && <div className="tag-error">태그가 중복되었습니다.</div>}
          <div className="tags">
            {tags.map((item) => (
              <div
                className="tag_item"
                key={item}
                onClick={() => onRemoveTag(item)}
              >
                #{item}
              </div>
            ))}
          </div>

          <p className="dueD">마감 목표일</p>
          <input id="date" type="date" value={date} onChange={dateChange} />

          <button className="add-todo-btn" type="submit">
            <AiOutlinePlus />
          </button>
        </form>
      )}
    </div>
  );
};

export default TodoInput;
