import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./cart.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../../api/utils/newRequest";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      newRequest.get(`/cart`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/cart/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      // window.location.reload();
    },
  });
  // Watch the mutation's isSuccess status
  // useEffect(() => {
  //   if (mutation.isSuccess) {
  //     // Trigger the page refresh
  //     window.location.reload();
  //   }
  // }, [mutation.isSuccess]);
  const handleDelete = (id) => {
    mutation.mutate(id);
    // Reload the entire page
  };

  const handlePay = (cartId) => {
    navigate(`/pay/${cartId}`);
  };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Cart</h1>
          </div>
          {/* {data && data.products.length === 0 && data.length === 0 ? ( */}
          {
            // data &&
            // data.products &&
            // data.products.length === 0 &&
            data.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    {/* <th>Image</th> */}
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((cart) => (
                    <React.Fragment key={cart._id}>
                      {cart.products.map((product) => (
                        <tr key={product.gigId}>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <img
                              className="delete"
                              src="./img/delete.png"
                              alt=""
                              onClick={() => handleDelete(product.gigId)}
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  <tr>
                    {/* <td colSpan="3">
                </td> */}
                  </tr>
                  {/* <Link to={`/pay/${cart._id}`}>
              <button>Continue</button>
            </Link> */}
                </tbody>
              </table>
            )
          }
          {/* {data.length > 0 && (
            <button onClick={() => handlePay(data[0]._id)}>Continue</button>
          )} */}
          {data.length > 0 && (
            <Link to={`/pay/${data[0]._id}`}>
              <button>Continue</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
