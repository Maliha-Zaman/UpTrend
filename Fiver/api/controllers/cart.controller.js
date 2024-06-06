import Cart from "../models/cart.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";

import getCurrentUser from "../utils/getCurrentUser.js";

// const gigowner = await Gig.findOne({
//   //...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
//   userId: req.userId,
// });
// if (gigowner && gigowner.userId != null) {
//   console.log(orders.userId);
//   //   return res.status(400).send({ message: "You can not buy your own gig" }); //throw new Error("Passwords must be same");
//   return res.json({ message: "You can not buy your own product" });
// }
export const posttocart = async (req, res, next) => {
  try {
    console.log("Cart");
    if (!req.userId) {
      res.json({ message: "Please log in to buy product" });
    }
    const seller = await User.findOne({
      //...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      _id: req.userId,
    });

    if (seller.isSeller) {
      //   console.log(orders.userId);
      //   return res.status(400).send({ message: "You can not buy your own gig" }); //throw new Error("Passwords must be same");
      return res.json({ message: "You are not elligible to buy products" });
    }
    const userId = req.userId;
    const { id } = req.params;
    //const gig = await Gig.findById(req.params.id);
    const newproduct = await Gig.findOne({
      //...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      _id: req.params.id,
    });
    console.log(newproduct);
    const cart = await Cart.findOne({ userId });

    if (cart) {
      console.log("Existing cart found");
      // Check if the cart already contains the product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.gigId === id
      );

      if (existingProductIndex !== -1) {
        console.log("Existing cart with existing product found");
        // Increase the quantity of the existing product in the cart
        const updatedCartforsameproduct = await Cart.findOneAndUpdate(
          {
            userId: userId,
            "products.gigId": id,
          },
          {
            $inc: { "products.$.quantity": 1 },
          },
          { new: true }
        );
        res.json({ message: "Product added to cart" });
        if (!updatedCartforsameproduct) {
          // Handle case where cart document doesn't exist for the user
          console.log("Cart nottttt found");
          //return;
        }

        console.log("Product added to previous product cart");
      } else {
        const updatedCart = await Cart.findOneAndUpdate(
          { userId: userId },
          {
            $push: {
              products: {
                gigId: id,
                sellerId: newproduct.userId,
                price: newproduct.price,
                title: newproduct.title,
              },
            },
          },
          { new: true }
        );
        res.json({ message: "Product added to cart" });

        console.log("Cart  found");

        if (!updatedCart) {
          // Handle case where cart document doesn't exist for the user
          console.log("Cart nottttt found");
          //return;
        }

        console.log("Product added to cart");
      }
    } else {
      console.log("No existing cart found");
      console.log("Something happened. Please try again");
      console.log(userId);
      const addnewProduct = new Cart({
        userId: userId,
        products: {
          gigId: id,
          sellerId: newproduct.userId,
          price: newproduct.price,
          title: newproduct.title,
        },
      });
      await addnewProduct.save();
      res.json({ message: "Product added to cart" });
    }
  } catch (err) {
    next(err);
    //res.send("Something wrong. Please try again");

    console.log("directed wrong");
  }
};
//

export const getfromcart = async (req, res, next) => {
  try {
    const cart = await Cart.find({
      //...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      userId: req.userId,
    });
    // console.log("uuuu");
    res.send(cart);
    // status(200)
  } catch (err) {
    next(err);
  }
};
export const deletefromcart = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const cart_exists = await Cart.findOne({ userId: req.userId });
    if (cart_exists) {
      console.log("found");
    }
    //     const cart = await Cart.findOne({
    //   products: { $elemMatch: { gigId: req.params.products.gigId } }
    // });
    const cart = await Cart.findOneAndUpdate(
      {
        userId: req.userId,
        "products.gigId": req.params.id,
      },
      {
        $pull: {
          products: { gigId: req.params.id },
        },
      },
      { new: true }
    );

    console.log("hehe");
    console.log(cart_exists.products.length);
    // await Gig.findByIdAndDelete(req.params.id);
    //     res.status(200).send("Gig has been deleted!");
    //  if (cart)
    //  { console.log(cart);

    //    await Cart.findByIdAndDelete(req.params.gigId);
    //  res.status(200).send("product has been deleted from the cart!");
    // }
    if (cart_exists && cart_exists.products.length == 1) {
      console.log("deleting");
      await Cart.findByIdAndDelete(cart_exists._id);
      console.log("deleting done");

      //res.status(200).send("Cart has been deleted!");
    }
    // else {
    //   res.status(200).send("Product has been deleted!");
    // }
    //res.status(200).send("Product has been deleted!");
    console.log("Product has been deleted");
  } catch (err) {
    next(err);
  }
};
//
