import {Order} from '../models/order.js'
import { User } from '../models/user.js'
import {instance} from '../server.js'
import crypto from 'crypto'


export const getMyData=async(req,res)=>{
    try {
        if(req.user) { 
           res.status(200).json({userDetails:req.user})
        } else {
            res.status(401).json({message:"Unauthorizedd"});
        }
    } catch(error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const uploadFiles = async (req, res) => {}

export const getPaymentKey = (req,res) => {
    console.log('key', process.env.RAZORPAY_API_KEY);
    res.status(200).json({key : process.env.RAZORPAY_API_KEY});
}

export const paymentCheckout = async (req, res) => {
    try {
        const {amount, influencer} = req.body;
        const user = req.user;
        // const userID = '661c282942e850fe006c071b';
        // const influencerData = await User.findById(influencer);
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
        const values = {buyer : user._id, influencer, amount, orderID : order.id};
        const docs = await Order.create(values);
        user.order.push(docs._id);
        await user.save();
        res.status(200).json({order});
    } catch (err) {
      console.log(err);
        res.status(404).json({message : "unable to create order"});
    }
}

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
          influecerData.order.push(order._id);
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

