"use client";

import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "../services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [userName, setUserName] = useState("User");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const router = useRouter();
  const tasksPerPage = 5;

  // 🔥 AUTH + INITIAL LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (!token) {
      router.push("/login");
    } else {
      if (name) setUserName(name);
      fetchTasks();
    }
  }, []);

  // 🔥 FETCH ON CHANGE (REAL API CALL)
  useEffect(() => {
    fetchTasks();
  }, [page, search, filter]);

  const fetchTasks = async () => {
    const data = await getTasks(page, tasksPerPage, search, filter);

    if (Array.isArray(data)) {
      setTasks(data);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleToggle = async (id: string) => {
    await toggleTask(id);
    toast.success("Status updated");
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    toast.success("Task deleted 🗑️");
    fetchTasks();
  };

  const handleCreate = async () => {
    if (!title) {
      toast.error("Enter task title");
      return;
    }

    try {
      const res = await createTask(title);

      if (res?.id) {
        toast.success("Task created ✅");
        setTitle("");
        setShowModal(false);
        fetchTasks();
      } else {
        toast.error(res.message || "Task creation failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleEditSave = async (id: string) => {
    if (!editText) return;

    await updateTask(id, editText);
    toast.success("Task updated ✏️");

    setEditingId(null);
    setShowModal(false);
    setEditText("");

    fetchTasks();
  };

  return (
    <>
      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 30px",
        background: "white",
        borderBottom: "1px solid #eee"
      }}>
        <b style={{ fontSize: "18px" }}>TaskManager</b>

        <div>
          Hi, {userName}
          <button
            onClick={logout}
            style={{
              marginLeft: "15px",
              background: "transparent",
              border: "none",
              color: "#6366f1",
              cursor: "pointer"
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto",
  background: "#f5f6fa",
  minHeight: "100vh"
}}>

        {/* HEADER */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px"
}}>
  <div>
    <h2>My Tasks</h2>

    

    {/* HEADER 3 → PAGE */}
    <h5 style={{ color: "#888", margin: "0" }}>
      Page {page}
    </h5>
  </div>

          <button
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setEditText("");
              setShowModal(true);
            }}
            style={{
              background: "#6366f1",
              color: "white",
              padding: "10px 18px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer"
            }}
          >
            + New Task
          </button>
        </div>

        {/* FILTER */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                background: filter === f ? "#6366f1" : "#e5e7eb",
                color: filter === f ? "white" : "#333",
                cursor: "pointer"
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            marginTop: "15px",
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            border: "1px solid #ddd"
          }}
        />

        {/* TASK LIST */}
        {tasks.map((task) => (
          <div key={task.id} style={{
  background: "white",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px"
}}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                onClick={() => handleToggle(task.id)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "2px solid #6366f1",
                  background: task.completed ? "#6366f1" : "white",
                  cursor: "pointer"
                }}
              />

              <div>
  <b style={{
    textDecoration: task.completed ? "line-through" : "none"
  }}>
    {task.title}
  </b>

  <br />

  <span style={{
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: task.completed ? "#dcfce7" : "#fef3c7",
    color: task.completed ? "#16a34a" : "#d97706"
  }}>
    {task.completed ? "Completed" : "Pending"}
  </span>

  <br />

  {/* 🔥 DATE */}
  <span style={{ fontSize: "11px", color: "gray" }}>
    {task.createdAt
      ? new Date(task.createdAt).toDateString()
      : ""}
  </span>
</div>
            </div>

            <div>
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditText(task.title);
                  setShowModal(true);
                }}
                style={{ marginRight: "10px" }}
              >
                ✏️
              </button>

              <button onClick={() => handleDelete(task.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}

        {/* SIMPLE PAGINATION */}
        <div style={{ marginTop: "20px" }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>Page {page}</span>

          <button onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            width: "350px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}>
            <h3>{editingId ? "Edit Task" : "New Task"}</h3>

            <input
              value={editingId ? editText : title}
              onChange={(e) =>
                editingId
                  ? setEditText(e.target.value)
                  : setTitle(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px"
              }}
            />

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button
                onClick={editingId
                  ? () => handleEditSave(editingId)
                  : handleCreate
                }
              >
                {editingId ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}