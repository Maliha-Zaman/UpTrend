import React, { useState } from "react";
import "./Login.scss";

import { Link, useNavigate } from "react-router-dom";

import newRequest from "../../../../api/utils/newRequest";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(res.data);
      setMsg(res.message);
      setTimeout(() => {
        setMsg("");
      }, 5000);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <div className="form_container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
            {/* {msg && <div className="error">{setMsg}</div>} */}
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>

            <button type="submit">
              {/* Login */}
              {loading ? <>Loading..</> : <>Login</>}
            </button>
            {/* {error && error} */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
