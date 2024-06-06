import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import newRequest from "../../../../api/utils/newRequest";
import getCurrentUser from "../../../../api/utils/getCurrentUser";

import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const [message, setMessage] = useState("");
  // const [quantity, setQuantity] = useState(0);
  // Declare the quantity state variable

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  //console.log(params);
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        //console.log(data.username);
        return res.data;
      }),
    enabled: !!userId,
  });
  const addToCart = () => {
    try {
      setLoading(true);
      // After successfully adding to the cart, update the quantity
      // setQuantity(quantity - 1);
      const currentUser = getCurrentUser(); // Call the getCurrentUser function

      if (!currentUser) {
        setMessage("Please log in to add the product to your cart");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setLoading(false);
        return; // Exit the function early
      }
      newRequest.post(`/cart/${id}`).then((response) => {
        setMessage(response.data.message); // Set the response message

        setTimeout(() => {
          setMessage("");
        }, 5000);
        setLoading(false);
        navigate("/gig");
      });
    } catch (error) {
      setMessage("Error adding product to cart"); // Set an error message
      console.error(error);
    }
    //
    // useEffect(() => {
    //   if (!getCurrentUser()) {
    //     setQuantity(data?.quantity || 0);
    //   }
    // }, [data?.quantity]);
    // //
  };
  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img.noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Product</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img.noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    {/* <button>Contact Me</button> */}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.title}</h3>
              <h2>Tk {data.price}</h2>
            </div>
            <p>
              {/* I will create a unique high quality AI generated image based on a
            description that you give me */}
              {/* {data.shortDesc} */}
            </p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>Delivery within</span>
                <span>{data.deliveryTime} days</span>
              </div>
              {/* <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber}</span>
              </div> */}
            </div>
            {/* <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design</span>
            </div>
          </div> */}
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {/* <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link> */}
            {/* <Link to={`/cart/${id}`}>
              <button>Continue</button>
            </Link> */}
            {/* <Link to={`/cart/${id}`}>
              <button onClick={handleSubmit}>Continue</button>
            </Link> */}
            {message && <p>{message}</p>}
            {/* <button onClick={addToCart} disabled={data.quantity === 0}>
              {loading ? <>Loading..</> : <>Add to cart</>}
            </button> */}
            {/* {data.quantity === 0 ? (  */}
            {/* {quantity === 0 ? (
              <button disabled>Sold Out</button>
            ) : (
              <button onClick={addToCart} disabled={loading}>
                {loading ? "Loading..." : "Add to Cart"}
              </button>
            )} */}
            {data.quantity <= 0 ? (
              <button disabled>Sold Out</button>
            ) : (
              <button onClick={addToCart} disabled={loading}>
                {loading ? "Loading..." : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
