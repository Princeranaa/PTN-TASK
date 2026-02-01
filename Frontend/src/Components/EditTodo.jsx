import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/todo/get/${id}`, {
        withCredentials: true,
      });
        const data = res.data;
        
        if (data.success) {
          setTitle(data.data.title);
          setDescription(data.data.description);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdateTodo = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      const payload = { title, description };
      const res = await axios.put(
        `${BASE_URL}/api/todo/update/${id}`,
        payload,  {
        withCredentials: true,
      }
      );
      const data = res.data;

      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Todo</h1>

      <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-xl shadow-md">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-3 justify-end">
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              className="btn btn-warning"
              onClick={handleUpdateTodo}
            >
              Update Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
