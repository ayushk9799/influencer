import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import { instance } from "../server.js";
import { sendOrderReceivedEmail,sendAdminOrderDetails } from "../email.js";
import crypto from "crypto";

export const getMyData = async (req, res) => {
  try {
    if (req.user) {
      const userDetails = await User.findById(req.user._id);
      res.status(200).json({ userDetails });
    } else {
      res.status(401).json({ message: "Unauthorizedd" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const removefavourite = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user) {
      await User.updateOne(
        { _id: req.user._id },
        { $pull: { favourites: id } }
      );
      res.status(200).json({ message: "done" });
    }
  } catch (error) {
    next(error);
  }
};
export const setfavourite = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.favourites.push(id);
        await user.save();
      }
    }
    res.status(200).json({ message: "done" });
  } catch (error) {
    next(error);
  }
};
// get razorpay payment public key
export const getPaymentKey = (req, res) => {
  return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

// user checkout form or payment
export const paymentCheckout = async (req, res) => {
  try {
    const data = req.body;
    const { amount, influencer } = data;
    // console.log('user', req.user);
    const user = await User.findById(req.user._id);

    const option = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: user._id,
      notes: {
        influencer: influencer,
      },
    };
    const order = await instance.orders.create(option);

    console.log('order', order);
    // update database with order id
    const values = { buyer: user._id, orderID: order.id, ...data };
    const docs = await Order.create(values);
    user.orders.unshift(docs._id);
    await user.save();  
    return res.status(200).json({ order });
  } catch (err) {
    return res.status(404).json({ message: "unable to create order", error : err.message });
  }
};

// when buyer makes payment it will verify payment.
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    // database update
    const order = await Order.findOne({ orderID: razorpay_order_id })
    .populate({path: "influencer", select: "email"})
    .populate({path: "buyer", select: "email"});    
    if (isAuthentic) {
      if (order) {
        const influecerData = await User.findById(order.influencer);
        order.buyerPaymentDetails = {
          paymentID: razorpay_payment_id,
          signatureID: razorpay_signature,
        };
        order.buyerPaymentStatus = "success";
        influecerData.orders.unshift(order._id);
        await order.save(); 
        await influecerData.save();
        // await sendOrderReceivedEmail(order?.influencer?.email,order?.amount);
        // await sendAdminOrderDetails(order?.influencer?.email,order?.buyer?.email,order?.amount)
      } else {
        return res.status(404).json({ message: "order not created" });
      }
    } else {
      // payment failed situation
      order.buyerPaymentStatus = "failed";
      await order.save();
    }
   
    return res.redirect(`${process.env.FRONTEND_URL}/user/orders/${order._id}`);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// get all order of an user.
export const getOrders = async (req, res) => {
  try {
    const user = req.user;
    let userDetails;
    if (user.contentCreator) {
      userDetails = await User.findById(user._id)
        .populate({
          path: "orders",
          populate: { path: "buyer", select: "name profilePic uniqueID" },
        })
        .select("orders");
    } else {
      userDetails = await User.findById(user._id)
        .populate({
          path: "orders",
          populate: { path: "influencer", select: "name profilePic uniqueID" },
        })
        .select("orders");
    }
    res.status(200).json({ orders: userDetails.orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getFavourites = async (req, res) => {
  try {
    if (req.user._id) {
      const favourites = await User.findById(req.user._id)
        .populate({ path: "favourites", select: "name profilePic uniqueID" })
        .select("favourites");

      res.status(200).json({ favourites: favourites });
    } else {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
// get order details of a order
export const getOrderDetails = async (req, res) => {
  try {
    const { orderID } = req.params;
    const user = req.user;
    if (orderID) {
      let order;
      if (user.contentCreator) {
        order = await Order.findById(orderID).populate({
          path: "buyer",
          select: "name profilePic",
        });
        if (order.influencer.toString() !== user._id.toString()) {
          return res.status(404).json({ message: "Order id not exist" });
        }
      } else {
        order = await Order.findById(orderID).populate({
          path: "influencer",
          select: "name profilePic uniqueID",
        });
        if (order.buyer.toString() !== user._id.toString()) {
          return res.status(404).json({ message: "Order id not exist" });
        }
      }

      return res.status(200).json({ order });
    } else {
      return res.status(404).json({ message: "orderID not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// client and influencer approval or rejection.
export const orderEventController = async (req, res) => {
  try {
    const params = req.params;
    const user = req.user;
    const order = await Order.findById(params.orderID);
    const { message, actionFor } = req.body;
    if (!req.body.status || !actionFor) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // typecasting status value
    let status;
    if (req.body.status === "accepted") {
      status = "success";
    } else if (req.body.status === "rejected") {
      status = "failed";
    } else {
      status = "pending";
    }

    if (order) {
      if (
        user.contentCreator &&
        actionFor === "influencer" &&
        user._id.toString() === order.influencer.toString()
      ) {
        const temp = { status, date: new Date(), message };
        order.workAccepted = temp;
        const data = await order.save();
        return res.status(200).json({
          orderStatus: data.orderStatus,
          workAccepted: data.workAccepted,
        });
      } else if (
        !user.contentCreator &&
        actionFor === "client" &&
        user._id.toString() === order.buyer.toString()
      ) {
        const temp = { status, date: new Date(), message };
        order.workApproval = temp;
        const data = await order.save();
        return res.status(200).json({
          orderStatus: data.orderStatus,
          workApproval: data.workApproval,
        });
      } else {
        return res.status(404).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
