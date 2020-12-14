import Axios from "axios";
import React, { useState } from "react";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("/api/login", { username, password })
      .then((res) => {
        console.log(res);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>This is login page</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default login;
