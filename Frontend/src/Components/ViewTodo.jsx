import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

function ViewTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/todo/get/${id}`,  {
        withCredentials: true,
      });
        const data = res.data;

        if (data.success) {
          setTodo(data.data);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-error">Todo not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
 
  <div className="p-3 flex flex-col items-center">
    <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-md select-none">
      View Todo
    </h1>

    <div className="w-full max-w-[700px] bg-base-300 p-5 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg select-none">Title</span>
          </label>
          <div className="p-4 bg-base-200 rounded-xl border border-purple-200 select-none">
            <p className="text-xl font-medium text-zinc-300">{todo.title}</p>
          </div>
        </div>

        
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg select-none">Description</span>
          </label>
          <div className="p-4 bg-base-200 rounded-xl border border-purple-200 min-h-[120px] max-h-60 overflow-y-auto select-none">
            <p className="whitespace-pre-wrap text-zinc-300 text-md leading-relaxed">
              {todo.description}
            </p>
          </div>
        </div>

       
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="btn btn-primary border-none transition-colors"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  </div>
);



}

export default ViewTodo;
