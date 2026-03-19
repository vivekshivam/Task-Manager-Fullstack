const BASE_URL = "http://localhost:5000";

// AUTH
export const registerUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const loginUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

// TASKS
export const getTasks = async (page = 1, limit = 5, search = "", status = "") => {
  const token = localStorage.getItem("token");

  let url = `${BASE_URL}/tasks?page=${page}&limit=${limit}`;

  if (search) url += `&search=${search}`;
  if (status === "completed") url += `&status=true`;
  if (status === "pending") url += `&status=false`;

  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 🔥 refresh logic (your step 1)
  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res.json();
};
export const createTask = async (title: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};

export const deleteTask = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const toggleTask = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
export const updateTask = async (id: string, title: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH", // ✅ FIXED
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const res = await fetch("http://localhost:5000/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      return data.accessToken;
    }

    return null;
  } catch {
    return null;
  }
};