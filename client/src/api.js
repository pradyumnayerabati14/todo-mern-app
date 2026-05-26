export async function loginUser(email, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return { response, data };
}

export async function signupUser(name, email, password) {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
}

export async function getTasks(token) {
  const response = await fetch("/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();
  return { response, data };
}

export async function createTask(title, token) {
  return fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export async function updateTask(taskId, completed, token) {
  return fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export async function removeTask(taskId, token) {
  return fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
