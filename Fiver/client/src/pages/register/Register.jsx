import React, { useState } from "react";
import upload from "../../../../api/utils/upload";
import "./Register.scss";
import newRequest from "../../../../api/utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      setLoading(true);
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      setMsg(res.message);
      setTimeout(() => {
        setMsg("");
      }, 5000);
      setLoading(false);
      navigate("/");
    } catch (errorMessage) {
      setLoading(false);

      if (
        errorMessage.response &&
        errorMessage.response.status >= 400 &&
        errorMessage.response.status <= 500
      ) {
        setErrorMessage(errorMessage.response.data.message);
      }
      console.log(errorMessage);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Confirm Password</label>
          <input
            name="cpassword"
            type="password"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Bangladesh"
            required
            onChange={handleChange}
          />
          

          {/* {error && <div>{error}</div>}
          {msg && <div>{msg}</div>} */}
    
        </div>
        <div className="right">
          <h2>To become a seller, activate the seller account</h2>
          {/* <h3>(Remember, you cannot buy products if you decide to become a seller!!)</h3> */}
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="01XXXXXXXX"
            onChange={handleChange}
          />
          <label htmlFor="">Address</label>
          <textarea
            placeholder="Address"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {msg && <div className="error">{setMsg}</div>}
                <button type="submit">
            {/* Register */}
            {loading ? <>Loading..</> : <>Register</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
