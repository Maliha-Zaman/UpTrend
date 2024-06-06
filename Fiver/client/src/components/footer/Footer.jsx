import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        {/* <div className="top">
          {/* <div className="item">
            <h2>Categories</h2>
          </div>
          <div className="item">
            <h2>About</h2>
          </div> 
        </div> */}
        <hr />
        <div className="bottom">
          <div className="left">
            <h1>UpTrend</h1>
            {/* <span>© Spectrum Ltd. 2023</span> */}
          </div>
          <div className="right">
            <div className="social">
              {/* <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" /> */}
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            {/* <Link to="">
              <button>Categories</button><t/>

            </Link>
              <button>About</button>
            <Link to="/team">
              
              <button>Team</button>

            </Link> */}
            {/* <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>BDT</span>
            </div> */}
            {/* <img src="/img/accessibility.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
