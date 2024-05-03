import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema({
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    influencer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    amount : {
        type : Number,
        required : true
    },
    buyerPaymentStatus : {
        type : String,
        enum : ['pending', 'failed', 'success'],
        default : 'pending'
    },
    influencerPaymentStatus : {
        type : String,
        enum : ['pending', 'failed', 'success']
    },
    buyerApproval : {
        type : Boolean,
        default : false
    },
    orderID : {
        type : String,
        required : true,
    },
    buyerPaymentDetails : {
        paymentID : String,
        signatureID : String
    },
    influencerPaymentDetails : {
        transactionID : String,
        date : Date,
    },
    review : {
        point : {
            type : Number,
            max : 5,
            min : 1
        },
        text : {
            type : String
        },
        date : {
            type : Date 
        }
    },
});

export const Order = mongoose.model("order", OrderSchema);