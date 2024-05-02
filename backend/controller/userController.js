import {Order} from '../models/order.js'


export const getMyData=async(req,res)=>{
   
    try{
        if(req.user)
        {
           
           res.status(200).json({userDetails:req.user})

        }
        else{
           
            res.status(401).json({message:"Unauthorizedd"});
        }
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

export const uploadFiles = async (req, res) => {

}

export const getPaymentKey = (req,res) => {
    console.log('key', process.env.RAZORPAY_API_KEY);
    res.status(200).json({key : process.env.RAZORPAY_API_KEY});
}

export const paymentCheckout = async (req, res) => {
    try {
        const {amount, influencer} = req.body;
    
        const userID = '661c282942e850fe006c071b';
        const option = {
          amount : Number(amount * 100),
          currency : 'INR',
          receipt : userID,
          notes : {
            influencer : influencer
          }
        }
        const order = await instance.orders.create(option);
        // update database with order id
        const values = {buyer : userID, influencer, amount, orderID : order.id};
        await Order.create(values);
        res.status(200).json({order});
    } catch (err) {
        res.status(404).json({message : "unable to create order"});
    }
}

export const paymentVerification =  async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_APT_SECRET).update(body.toString()).digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    // database update
    if(isAuthentic) {
      const order = await Order.findOne({orderID : razorpay_order_id});
      console.log('order',order);
      if(order) {
        order.buyerPaymentDetails = {paymentID :  razorpay_payment_id, signatureID : razorpay_signature};
        order.buyerPaymentStatus = "success";
        await order.save();
      } else {
        console.log('Order not created');
      }
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }
    res.redirect(`${process.env.FRONTEND_URL}/payment-success?reference=${razorpay_payment_id}`);
}

