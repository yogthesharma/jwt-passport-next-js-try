import Axios from "axios";
import React, { useState } from "react";

const register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, name, password };
    await Axios.post("/api/register", user)
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
      <h2>This is register page</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default register;
