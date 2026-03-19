"use client";

import { useState } from "react";
import { registerUser } from "../services/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await registerUser({ name, email, password });

      if (res?.accessToken) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("name", name);
        router.push("/dashboard");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f6fa",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* ICON */}
        <div
          style={{
            width: "60px",
            height: "60px",
            background: "#6366f1",
            borderRadius: "16px",
            margin: "0 auto",
            marginBottom: "20px",
          }}
        />

        {/* HEADER */}
        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>
          Create account
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Start managing your tasks today
        </p>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <label style={{ fontSize: "14px", fontWeight: "500" }}>
            Full Name
          </label>
          <input
            placeholder="ex. Arjun"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          {/* EMAIL */}
          <label style={labelStyle}>Email Address</label>
          <input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          {/* PASSWORD */}
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {/* BUTTON */}
          <button
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              borderRadius: "25px",
              border: "none",
              background: "linear-gradient(90deg, #6366f1, #4f46e5)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "#6366f1", cursor: "pointer", fontWeight: "500" }}
            onClick={() => router.push("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

/* STYLES */
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  outline: "none",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
};