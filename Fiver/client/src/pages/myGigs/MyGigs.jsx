import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

import getCurrentUser from "../../utils/getCurrentUser";
function MyGigs() {
  // const currentUser = {
  //   id: 1,
  //   username: "Anna",
  //   isSeller: true,
  // };
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
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
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Product</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              {/* <th>Sales</th> */}
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img
                    className="image"
                    //src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    src={gig.cover}
                    alt=""
                  />
                </td>
                {/* <td>Stunning concept art</td> */}
                <td>{gig.title}</td>

                <td>
                  {/* 59.<sup>99</sup> */}
                  {gig.price}
                </td>
                {/* <td>13</td> */}
                {/* <td>{gig.sales}</td> */}

                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
