import express from "express";
import {
  getMyData,
  paymentCheckout,
  getPaymentKey,
  paymentVerification,
  getOrders,
  getOrderDetails,
  orderEventController,
  setfavourite,
  removefavourite,
  getFavourites,
} from "../controller/userController.js";
import multer from "multer";
import { deleteS3, presignedUrl } from "../s3.js";

const router = express.Router();

router.get("/getMyData", getMyData);

router.get("/payment/get-key", getPaymentKey);

router.post("/payment/checkout", paymentCheckout);

router.post("/payment/payment-verification", paymentVerification);

router.get("/orders", getOrders);

router.get("/orders/:orderID", getOrderDetails);

router.post("/order/order-events/:orderID", orderEventController);
router.get("/favourite/create/:id", setfavourite);
router.get("/favourite/remove/:id", removefavourite);
router.get("/favourite/get", getFavourites);
router.get("/presigned", async (req, res) => {
  const totalfiles = req.query.total;

  try {
    const { keys, urls } = await presignedUrl(totalfiles);
    res.status(200).json({ keys: keys, urls: urls });
  } catch (error) {
    res.status(400).json({ error: "error occured" });
  }
});

router.get("/delete", async (req, res) => {
  const deletKeys = req.query.delete;
  const deleteKeysArray = deletKeys.split(",");

  const value = await deleteS3(deleteKeysArray);

  if (value) res.status(200).json({ deleteStatus: true });
  else {
    res.status(400).json({ deleteStatus: false });
  }
});
router.use((req, res, next) => {
  // If no route matched in UserRouter

  if (!req.route) {
    return next();
  }
  // If a route matched but sent a 404, also pass to next
  if (res.statusCode === 404) {
    return next();
  }
  // Otherwise, send the response from UserRouter
  next("route");
});
export default router;
