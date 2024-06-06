import { useEffect, useParams, useState, useNavigate } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import success from "../../images/success.png";
// import styles from "./styles.module.css";
import { Fragment } from "react";
import newRequest from "../../../../api/utils/newRequest";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const navigate = useNavigate();
    const verifyEmailUrl = async () => {
      try {
        // await newRequest.get("auth/${param:id}/verify/${param:token}");
        const url = `http://localhost:8800/api/auth/${param.id}/verify/${param.token}`;
        console.log("iiii");
        // const { data } =
        await axios.get(url).then((response) => {
          console.log(response.data.message); // Output: Token removed successfully
          navigate("/login");
          // Perform navigation logic here based on the response
          // For example, use React Router to navigate to a specific route
        });
        // console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <br />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            {error && <div className="error">{error}</div>}

            <button>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
