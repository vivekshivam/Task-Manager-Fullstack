"use client";

import { useState } from "react";
import { loginUser } from "../services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      if (res.accessToken) {
  localStorage.setItem("token", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken); 
        localStorage.setItem("name", email.split("@")[0]);
toast.success("Login successful ✅");
        router.push("/dashboard");
      } else {
        toast.error(res.message || "Invalid login");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f6fa"
    }}>
      <div style={{
        width: "380px",
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>

        {/* LOGO / BRAND */}
        <div style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#6366f1",
          marginBottom: "10px"
        }}>
          Task Manager
        </div>

        <p style={{ color: "gray", marginBottom: "25px" }}>
          Welcome back! Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "15px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px"
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#6366f1", cursor: "pointer", fontWeight: "500" }}
            onClick={() => router.push("/register")}
          >
            Create one
          </span>
        </p>

      </div>
    </div>
  );
}