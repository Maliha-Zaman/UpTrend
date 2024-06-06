// import createError from "../utils/createError.js";

// export const createReview = async (req, res, next) => {

//   try {

//     //TODO: check if the user purchased the gig.

//     res.status(201).send(savedReview);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getReviews = async (req, res, next) => {

// export const deleteReview = async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// };

// import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
export const createReview = async (req, res, next) => {
  if (req.isSeller)
    // return next(createError(403, "Sellers can't create a review!"));
    return res.status(400).json({ message: "Sellers can't create a review!" });

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });
  try {
    const order = await Order.findOne({
      gigId: req.body.gigId,
      buyerId: req.userId,
      isCompleted: true,
    });
    if (!order) {
      // return next(
      // createError(405, "You have not purchased from this seller yet.")

      // );
      return res
        .status(402)
        .json({ message: "You have not purchased from this seller yet." });
    }
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      // return next(
      //   createError(403, "You have already created a review for this gig!")
      // );
      return res.status(406).json({
        message: "You have already created a review for this product!",
      });

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
