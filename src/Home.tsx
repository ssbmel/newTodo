import { useState } from "react";
import { Database } from "./supabase/supabaseTypes";

type Todo = {
  id: string;
  contents: string;
  isDone: boolean;
};

export default function Home() {
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoData, setTodoData] = useState<Database>([]);

  const { data: todos, error } = await supabase.from("todos").select("*");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputTodo(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: new Date().toISOString(),
      contents: inputTodo,
      isDone: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputTodo("");
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
      <form>
        {todoList.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              height: "30px",
              alignItems: "center",
            }}
          >
            <p>{todo.contents}</p>
            <button>수정</button>
            <button>삭제</button>
          </div>
        ))}
      </form>
    </>
  );
}
