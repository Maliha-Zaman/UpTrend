import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Review from "../review/Review";
import newRequest from "../../utils/newRequest";
import { useState } from "react";

import "./Reviews.scss";
const Reviews = ({ gigId }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["reviews"],
  //   queryFn: () =>
  //     newRequest.get(`/reviews/${gigId}`).then((res) => {
  //       return res.data;
  //     }),
  // });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries(["reviews"]);
    // },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    //mutation.mutate({ gigId, desc, star });
    //
    try {
      await mutation.mutateAsync({ gigId, desc, star });
      // Handle success response
      //  onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      //  },
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      setErrorMessage(errorMessage);
    }
    //
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your review" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {/* <div>
          <h3>Rating:</h3> <br />
            <span>Rate this product on a scale of 5: </span> <br />
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  // checked={selectedRating === value} 
                  // onChange={handleRatingChange}
                />
                {value}<br />
              </label>
            ))}
          </div> */}
          {errorMessage && <div className="error">{errorMessage}</div>}

          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
