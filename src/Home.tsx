import { useEffect, useState } from "react";

import { Database, Todo } from "./supabase/supabaseTypes";
import supabase from "./supabase/supabase";

export default function Home() {
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase.from("todos").select("*");
      if (error) {
        console.log(error);
      } else {
        setTodoList(todos);
      }
    };
    fetchTodos();
  }, []);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputTodo(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      contents: inputTodo,
      isDone: false,
    };

    const { data, error } = await supabase.from("todos").insert({
      contents: inputTodo,
      isDone: false,
    });
    if (error) {
      console.log(error);
    } else {

      setTodoList([...todoList, newTodo]);
      setInputTodo("");
      console.log(data);
    }
  };

  const deleteHandler = async (id) => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq('id', id);
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={inputTodo}
          onChange={onChange}
          placeholder="할일을 적어주세욧!"
        />
        <button>등록</button>
      </form>
      <hr />
      <div>
        {todoList.map((todo, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              height: "30px",
              alignItems: "center",
            }}
          >
            <p>{todo.contents}</p>
            <button>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </div>
        ))}
      </div>
    </>
  );
}
