import Axios from "axios";
import React from "react";

const index = () => {
  const logout = async () => {
    await Axios.get("/api")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>This is protected route.</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default index;
