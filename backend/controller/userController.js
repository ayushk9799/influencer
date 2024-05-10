import {Order} from '../models/order.js'
import { User } from '../models/user.js'
import {instance} from '../server.js'
import crypto from 'crypto'


export const getMyData=async(req,res)=>{
    try {
        if(req.user) {
          const userDetails = await User.findById(req.user._id);
           res.status(200).json({userDetails})
        } else {
            res.status(401).json({message:"Unauthorizedd"});
        }
    } catch(error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

// for uploading file to s3 storage
export const uploadFiles = async (req, res) => {}

// get razorpay payment public key
export const getPaymentKey = (req,res) => {
    console.log('key', process.env.RAZORPAY_API_KEY);
    res.status(200).json({key : process.env.RAZORPAY_API_KEY});
}

// user checkout form or payment
export const paymentCheckout = async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const {amount, influencer} = data;
      const user = req.user;
      const option = {
        amount : Number(amount * 100),
        currency : 'INR',
        receipt : user._id,
        notes : {
          influencer : influencer
        }
      }
      const order = await instance.orders.create(option);
      // update database with order id
      const values = {buyer : user._id, orderID : order.id, ...data};
      const docs = await Order.create(values);
      user.orders.push(docs._id);
      await user.save();
      res.status(200).json({order});
    } catch (err) {
      res.status(404).json({message : "unable to create order"});
    }
}

// when buyer makes payment it will verify payment.
export const paymentVerification =  async(req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      console.log('body', req.body);
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_APT_SECRET).update(body.toString()).digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
      // database update
      if(isAuthentic) {
        const order = await Order.findOne({orderID : razorpay_order_id});
        // console.log('order',order);
        if(order) {
          const influecerData = await User.findById(order.influencer);
          order.buyerPaymentDetails = {paymentID :  razorpay_payment_id, signatureID : razorpay_signature};
          order.buyerPaymentStatus = "success"; 
          influecerData.orders.push(order._id);
          await order.save();
          await influecerData.save();
        } else {
          // console.log('Order not created');
          return res.status(404).json({message : 'order not created'});
        }
      } else {
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
      }
      return res.redirect(`${process.env.FRONTEND_URL}/payment-success?reference=${razorpay_payment_id}`);
    } catch(err) {
      return res.status(404).json({message : err.message});
    }
}

// get all order of an user.
export const getOrders = async(req,res)=>{
    try {
      const user = req.user;
      let userDetails;
      if(user.contentCreator) {
        userDetails = await User.findById(user._id).populate({path:'orders',populate:{path:'buyer',select:'name profilePic uniqueID'}}).select('orders');
      } else {
        userDetails = await User.findById(user._id).populate({path:'orders',populate:{path:'influencer',select:'name profilePic uniqueID'}}).select('orders');
      }
        res.status(200).json({orders : userDetails.orders});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

// get order details of a order
export const getOrderDetails = async (req, res) =>  {
  try {
    const {orderID} = req.params;
    const user = req.user;
    if(orderID) {
      let order;
      if(user.contentCreator) {
        order = await Order.findById(orderID).populate({path : 'buyer', select : 'name profilePic uniqueID'});
        if(order.influencer.toString() !== user._id.toString()) {
          return res.status(404).json({message : 'Order id not exist'});
        }
      } else {
        order = await Order.findById(orderID).populate({path : 'influencer', select : 'name profilePic uniqueID'});
        console.log(order.buyer, user._id);
        if(order.buyer.toString() !== user._id.toString()) {
          return res.status(404).json({message : 'Order id not exist'});
        }
      }
      return res.status(200).json({order});
    } else {
      return res.status(404).json({message : 'orderID not exist'});
    }
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
  }
}

// only influecner can accept client order
export const influencerWorkAcceptance = async (req, res) => {
  try {
    const params = req.params;
    const user = req.user;
    const order = await Order.findById(params.orderID);
    // console.log('order', order);
    if(order.influencer.toString() === user._id.toString() && user.contentCreator) {
      const temp = {
        status : true,
        date : new Date()
      }
      order.workAccepted = temp;
      const data = await order.save();
      return res.status(200).json({orderStatus : data.orderStatus, workAccepted : data.workAccepted});
    } else {
      return res.status(404).json({message : 'something went wrong'});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"Internal Server Error"})
  }
}

// only client can approve influencer payment
export const clientWorkApproval = async (req, res) => {
  try {
    const params = req.params;
    const user = req.user;
    const order = await Order.findById(params.orderID);
    if(order.buyer.toString() === user._id.toString() && !user.contentCreator) {
      const temp = {
        status : true,
        date : new Date()
      }
      order.workApproval = temp;
      const data = await order.save();
      return res.status(200).json({orderStatus : data.orderStatus, workApproval : data.workApproval});
    } else {
      return res.status(404).json({message : 'something went wrong'});
    }
  } catch (err) {
    return res.status(500).json({message:"Internal Server Error"})
  }
}