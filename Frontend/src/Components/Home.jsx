import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/todo/get`, {
        withCredentials: true,
      });
      const data = res.data;

      if (data.success) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      const payload = { title, description };
      const res = await axios.post(`${BASE_URL}/api/todo/create`, payload,  {
        withCredentials: true,
      });
      const data = res.data;

      if (data.success) {
        setTodos([...todos, data.data]);
        setTitle("");
        setDescription("");
        toast.success("Todo added successfully");
      }
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/todo/delete/${id}`,  {
        withCredentials: true,
      });
      const data = res.data;

      if (data.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">My Todos</h1>

      <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-xl shadow-md ">
        <div className="flex flex-col gap-4 items-start lg:items-center">
          <input
            type="text"
            placeholder="Title"
            className="input font-semibold input-bordered outline-none w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="textarea font-semibold textarea-bordered outline-none w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="btn btn-primary w-full lg:w-auto px-6 py-3 self-start lg:self-auto"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto 
             max-h-[500px] overflow-y-auto no-scrollbar"
      >
        {todos.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No todos found
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {todo.title.length > 50
                    ? `${todo.title.slice(0, 30)}...`
                    : todo.title}
                </h2>

                <p className="whitespace-pre-wrap text-sm font-semibold">
                  {todo.description.length > 100
                    ? `${todo.description.slice(0, 100)}...`
                    : todo.description}
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => navigate(`/todos/${todo._id}/view`)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-warning"
                    onClick={() => navigate(`/todos/${todo._id}/edit`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
