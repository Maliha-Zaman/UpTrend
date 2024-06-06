import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

import Stripe from "stripe";
import getCurrentUser from "../utils/getCurrentUser.js";
// const userData = localStorage.getItem("user");

// // Check if user data exists
// if (userData) {
//   // User data exists in local storage
//   const user = JSON.parse(userData);
//   // Perform actions with the user data
//   console.log("User:", user);
// } else {
//   // User data does not exist in local storage
//   console.log("User data not found");
// }
// const orders = await Gig.findOne({
//   //...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
//   userId: req.userId,
// });
// if (orders && orders.userId != null) {
//   console.log(orders.userId);
//   return res.status(400).send({ message: "You can not buy your own gig" }); //throw new Error("Passwords must be same");
// } else {
//   console.log("No orders found for the user");
// }
// const user= getCurrentUser();
// if(orders.userId!=null)
// {
//   console.log("rders.userId");

// }
// if(!orders.userId){
//   return res.status(400).send({ message: "You can not buy your own gig" }); //throw new Error("Passwords must be same");

// }
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);
  const cart = await Cart.findOne({ userId: req.userId });

  if (!cart) {
    return res.status(400).send({ message: "Cart not found" });
  }
  const orders = [];
  const clientSecrets = [];
  let totalAmount = 0;

  for (const product of cart.products) {
    // const gig = await Gig.findById(req.params.id);
    const gig = await Gig.findById(product.gigId);
    const amount = product.price * product.quantity * 100;
    totalAmount += amount;
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      //price: gig.price,
      price: product.price * product.quantity,
      quantity: product.quantity,
      // payment_intent: paymentIntent.id,
    });
    orders.push(newOrder);
  }
  try {
    //await Order.insertMany(orders);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("gig._id");
    for (const order of orders) {
      order.payment_intent = paymentIntent.id;
    }

    await Order.insertMany(orders);
    console.log("hhhhh");
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
    console.log("here");
    // await newOrder.save();
    //clientSecrets.push(paymentIntent.client_secret);
  } catch (error) {
    // try {
    //   //res.status(200).send({ clientSecrets });
    //   res.status(200).send({ clientSecrets: clientSecrets.join(",") });

    //   // res.status(200).send({ clientSecret: paymentIntent.client_secret });
    //   console.log("here");
    //   //res.status(200).send({ orders: createdOrders });
    // }
    res.status(500).send({ message: "Failed to create orders" });
  }
};
// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);
//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: "temporary",
//     });
//     await newOrder.save();

//     res.status(200).send("successful");
//   } catch (err) {
//     next(err);
//   }
// };
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      //...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      buyerId: req.userId,
      isCompleted: true,
    });
    // console.log("uuuu");
    res.send(orders);
    // status(200)
  } catch (err) {
    next(err);
  }
};
// export const getUser = async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   res.status(200).send(user);
// };

// const orders = await Order.findOneAndUpdate(
//   {
//     payment_intent: req.body.payment_intent,
//   },
//   {
//     $set: {
//       isCompleted: true,
//     },
//   }
// );
// export const confirm = async (req, res, next) => {
//   try {
//     const userId = req.userId;

//     const cart = await Cart.findOne({ userId });

//     if (cart) {
//       const products = cart.products;

//       const uniqueGigIds = [];

//       // Iterate over each product in the products array
//       for (const product of products) {
//         const { gigId, sellerId } = product;
//         if (!uniqueGigIds.includes(gigId)) {
//           uniqueGigIds.push(gigId);
//           // Update the corresponding order to mark it as complete
//           await Order.updateMany(
//             {
//               gigId: product.gigId,
//               sellerId: product.sellerId,
//               isCompleted: false,
//             },
//             {
//               $set: {
//                 isCompleted: true,
//               },
//             }
//           );
//         }
//       }
//     }
//     res.status(200).send("Order has been confirmed.");
//   } catch (err) {
//     next(err);
//   }
// };
// export const confirm = async (req, res, next) => {
//   try {
//     const userId = req.userId;

//     const cart = await Cart.findOne({ userId });

//     if (cart) {
//       const products = cart.products;
//       // const uniqueGigIds = [];
//       const uniqueGigIds = new Set();

//       for (const product of products) {
//         const { gigId, sellerId } = product;

//         if (!uniqueGigIds.has(gigId)) {
//           uniqueGigIds.add(gigId);

//           await Order.updateOne(
//             {
//               gigId,
//               sellerId,
//               isCompleted: false,
//             },
//             {
//               $set: {
//                 isCompleted: true,
//               },
//             }
//           );

//           // Remove the processed product from the cart
//           await Cart.findOneAndUpdate(
//             { userId },
//             {
//               $pull: {
//                 products: {
//                   gigId,
//                   sellerId,
//                 },
//               },
//             }
//           );
//         }
//       }
//     }

//     res.status(200).send("Order has been confirmed.");
//   } catch (err) {
//     next(err);
//   }
// };

// const cart = await Cart.findOne({ userId });
// console.log("paymentafterhere");
// if (cart) {
//   for (const product of cart.products) {
//     const { gigId, sellerId } = product;
//     console.log("paymentafterhere2");

//     const existingOrder = await Order.findOne({
//       gigId: product.gigId,
//       sellerId: product.sellerId,
//       buyerId: userId,
//       isCompleted: false,AuthInMern-Authentication-In-MERN
//     });
//     console.log("paymentafterhere3");

//     if (existingOrder) {
//       existingOrder.isCompleted = true;
//       await existingOrder.save();
//       console.log("paymentafterhere4");

//       // Remove the processed product from the cart
//       await Cart.findOneAndUpdate(
//         { userId },
//         {
//           $pull: {
//             products: {
//               gigId,
//               sellerId,
//             },
//           },
//         }
//       );
//       console.log("paymentafterhere5");
//     }
//   }
//   await Cart.deleteMany({ userId });
//   console.log("paymentafterhereloop");
// }
// console.log("paymentdone");

// res.status(200).send("Order has been confirmed.");
export const confirm = async (req, res, next) => {
  try {
    // const userId = req.userId;
    console.log("kkkkkkkkkkkkkhere");
    const userId = req.userId;
    console.log(userId);
    const cart = await Cart.findOne({ userId: userId });
    console.log(cart.products);
    if (cart) {
      const productCount = cart.products.length;

      cart.products.forEach(async (product) => {
        console.log(product);
        //console.log(product);
        const fiveSecondsAgo = new Date(Date.now() - 60000); // Subtract 5 seconds from the current timestamp

        //const { gigId, sellerId } = product;
        //console.log("paymentafterhere2");
        await Order.findOneAndUpdate(
          {
            createdAt: { $gte: fiveSecondsAgo },
            gigId: product.gigId,
            createdBy: userId,

            // sellerId: product.sellerId,
            // buyerId: userId,
            // isCompleted: false,
          },
          { $set: { isCompleted: true } }
          // { upsert: false }
        );

        const gigId = product.gigId;
        const quantityToSubtract = parseInt(product.quantity);

        await Gig.findOneAndUpdate(
          { _id: gigId, userId: product.sellerId },
          { $inc: { quantity: -quantityToSubtract } }
        );

        await Cart.findOneAndUpdate(
          { userId: userId },
          {
            $pull: {
              products: {
                gigId: product.gigId,
                sellerId: product.sellerId,
              },
            },
          }
        );
        // console.log("paymentafterdelete");
      });
      // }

      await Cart.deleteMany({ userId });
      // console.log("paymentafterloop");
    }

    console.log("paymentafterhere5");
    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
