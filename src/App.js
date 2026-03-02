import { useState, useEffect } from "react";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  

  useEffect(() => {
  fetch("http://localhost:8080/user", {
    credentials: "include"
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Not logged in");
    })
    .then(data => {
      console.log("User:", data);
    })
    .catch(() => {
      console.log("User not logged in");
    });
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/sendTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    });

    const data = await res.text();
    setResponse(data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Testing Phase</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "10px" }} type="submit">
          Submit
        </button>
        <button type="button"onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/azure"}> Login with Microsoft </button>
      </form>

      <h3>{response}</h3>
    </div>
  );
}

export default App;
