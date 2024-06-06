import { useQuery } from "@tanstack/react-query";
import React from "react";
//import Review from "../review/Review";
import newRequest from "../../utils/newRequest";

import "./Review.scss";
const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  // const queryClient = useQueryClient()
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["reviews"],
  //   queryFn: () =>
  //     newRequest.get(`/reviews/${gigId}`).then((res) => {
  //       return res.data;
  //     }),
  // });

  // const mutation = useMutation({
  //   mutationFn: (review) => {
  //     return newRequest.post("/reviews", review);
  //   },
  //   onSuccess:()=>{
  //     queryClient.invalidateQueries(["reviews"])
  //   }
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const desc = e.target[0].value;
  //   const star = e.target[1].value;
  //   mutation.mutate({ gigId, desc, star });
  // };

  return (
              <div className="review">
                {isLoading
              ? ("loading")
              : error
              ? ("Something went wrong!"):(<div className="user">
                  <img
                    className="pp"
                    src={data.img || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <div className="info">
                    <span>{data.username} </span>
                    <div className="country">
                      
                      <span>{data.country}</span>
                    </div>
                  </div>
                </div>)}
                <div className="stars">
                  {Array(review.star)
                  .fill()
                  .map((item,i)=>(
                    <img src="/img/star.png" alt="" key={i}/>
                  ))}
                
                  <span>{review.star}</span>
                </div>
                <p>
                  {review.desc}
                </p>
             
              </div>
         
  );
};

export default Review;
