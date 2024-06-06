import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../../../api/utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">UpTrend</span>
          </Link>
          {/* <span className="dot">.</span> */}
        </div>
        <div className="links">
          {!currentUser?.isSeller}
          {currentUser ? (
            <div className="carts">
              <div className="user" onClick={() => setOpen(!open)}>
                <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>

                {open && (
                  <div className="options">
                    {currentUser.isSeller && (
                      <>
                        <Link className="link" to="/mygigs">
                          Products
                        </Link>
                        <Link className="link" to="/add">
                          Add New Product
                        </Link>
                      </>
                    )}
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" to="/messages">
                      Messages
                    </Link>
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
              <div className="carts2">
                {!currentUser.isSeller && (
                  <>
                    <Link className="link" to="/cart">
                      <button class="cart-button" aria-label="Add to Cart">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M21 7h-4V6a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1H3a1 1 0 0 0 0 2h1v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9h1a1 1 0 0 0 0-2zM7 6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V6zm9 14H8V9h8v11zm-4-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-3-4v2h2v-2h-2zm0-4h2V9h-2V6zm4 0h2V9h-2V6z"/>
                  </svg> */}
                        <img src="/img/cart2.png" alt="" />
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                <button>Login</button>
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <script
            src="https://kit.fontawesome.com/0ba00a17f9.js"
            crossorigin="anonymous"
          ></script>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=shirt">
              Shirt
            </Link>
            <Link className="link menuLink" to="/gigs?cat=tshirt">
              T-shirts
            </Link>
            <Link className="link menuLink" to="/gigs?cat=pant">
              Pants
            </Link>
            <Link className="link menuLink" to="/gigs?cat=kameez">
              Kameez
            </Link>
            <Link className="link menuLink" to="/gigs?cat=watches">
              Watches
            </Link>
            <Link className="link menuLink" to="/gigs?cat=glasses">
              Glasses
            </Link>
          </div>
          {/* <hr /> */}
        </>
      )}
    </div>
  );
}

export default Navbar;
