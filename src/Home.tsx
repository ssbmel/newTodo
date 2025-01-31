import { useEffect, useRef, useState } from "react";

import { Todo } from "./supabase/supabaseTypes";
import supabase from "./supabase/supabase";

export default function Home() {
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const editTodoRef = useRef<HTMLInputElement>(null);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      console.log(error);
    }
    if (!data) {
      return
    }
    setTodoList(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputTodo(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      contents: inputTodo,
      isDone: false,
      isClicked: false,
    };
    const { data, error } = await supabase.from("todos").insert({
      contents: inputTodo,
      isDone: false,
      isClicked: false,
    });
    if (error) {
      console.log(error);
      console.log(data);
      
    }
    setTodoList([...todoList, newTodo]);
    setInputTodo("");
  };
  const deleteHandler = async (id: number) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.log(error);
    } else {
      alert("삭제할까욧?");
      console.log(data);
    }
    setTodoList([...todoList]);
    fetchTodos();
  };

  const editHandler = async (id: number) => {
    const clickedBtn = todoList?.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            isClicked: !todo.isClicked,
          }
        : todo
    );
    setTodoList(clickedBtn);
  };

  const editTodoHandler = async (id: number) => {
    if(!editTodoRef.current) {
      return;
    }
    const { data, error } = await supabase
      .from("todos")
      .update({ contents: editTodoRef.current.value })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      alert("수정되었습니당");
      console.log(data);
    }
    setTodoList([...todoList]);
    fetchTodos();
  };

  const toggleHandler = async (id: number) => {
    const finishedContent = todoList?.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            isDone: !todo.isDone,
          }
        : todo
    );
    setTodoList(finishedContent);
  };

  return (
    <>
      <div className="box">
        <h1>Todo List</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={inputTodo}
            onChange={onChange}
            placeholder="할일을 적어주세욧!"
            className="inputStyle"
          />
          <button
            style={{
              height: "30px",
              cursor: "pointer",
            }}
          >
            등록
          </button>
        </form>
        <hr />
        <div>
          {todoList?.map((todo) => (
            <div className="todoBox" key={todo.id}>
              {todo.isClicked ? (
                <input className="editInput" defaultValue={todo.contents} ref={editTodoRef} />
              ) : (
                  <p
                    key={todo.id}
                    onClick={() => toggleHandler(todo.id)}
                    style={{
                      cursor: "pointer",
                      width : "500px",
                      textDecoration: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.contents}
                  </p>
              )}
              {todo.isClicked ? (
                <button
                  className="btn"
                  onClick={() => editTodoHandler(todo.id)}
                >
                  완료
                </button>
              ) : (
                <button className="btn" onClick={() => editHandler(todo.id)}>
                  수정
                </button>
              )}
              <button className="btn" onClick={() => deleteHandler(todo.id)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
