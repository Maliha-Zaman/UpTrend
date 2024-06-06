import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <>
    <div className="CartCategories">
    <Link to="/gigs?cat=shirt">
    <div className="catCard">
        <div className="image">
          <img src="./img/shirt.png" alt="" />
        </div>
        <div className="info">
          <p className="title">Shirt</p>
        </div>
    </div>
    </Link>
    <Link to="/gigs?cat=tshirt">
    <div className="catCard">
      <img src="./img/tshirt.png" alt="" />
      <p className="title">T-shirt</p>
    </div>
    </Link>
    <Link to="/gigs?cat=pant">
    <div className="catCard">
      <img src="./img/jeans.png" alt="" />
      <p className="title">Pant</p>
    </div>
    </Link>
    <Link to="/gigs?cat=kameez">
    <div className="catCard">
      <img src="./img/kurta.png" alt="" />
      <p className="title">Kameez</p>
    </div>
    </Link>
    <Link to="/gigs?cat=shoes">
    <div className="catCard">
      <img src="./img/shoes.png" alt="" />
      <p className="title">Shoes</p>
    </div>
    </Link>
    <Link to="/gigs?cat=watches">
    <div className="catCard">
      <img src="./img/wristwatch.png" alt="" />
      <p className="title">Wristwatch</p>
    </div>
    </Link>
    <Link to="/gigs?cat=bag">
    <div className="catCard">
      <img src="./img/bag.png" alt="" />
      <p className="title">Bag</p>
    </div>
    </Link>
    <Link to="/gigs?cat=glasses">
    <div className="catCard">
      <img src="./img/glasses.png" alt="" />
      <p className="title">Glasses</p>
    </div>
    </Link>
    </div>
    </>
  );
}
export default CatCard;
    {/* <div className="catCard">
    <img src={card.img} alt="" />
    <p className="desc">{card.desc}</p>
      <p className="title">{card.title}</p>
    </div> */}
