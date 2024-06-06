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
    orderSummary : {
        orderType : {
            type : String,
            enum : ['main', 'custom']
        },
        accountType : {
            type : String,
            enum : ['instagram', 'youtube']
        },
        summary : String,
        details : String,
    },
    buyerPaymentStatus : {
        type : String,
        enum : ['pending', 'failed', 'success'],
        default : 'pending'
    },
    workAccepted : { // by influencer [success='accepted', failed='rejected']
        status : {
            type : String,
            enum : ['pending', 'success', 'failed'],
            default : 'pending'
        },
        message : {
            type : String,
        },
        date : {
            type : Date
        }
    },
    workApproval : { // by buyer [success='accepted', failed='rejected']
        status : {
            type : String,
            enum : ['pending', 'success', 'failed'],
            default : 'pending'
        },
        message : {
            type : String,
        },
        date : {
            type : Date
        }
    },
    influencerPaymentStatus : {
        type : String,
        enum : ['pending', 'failed', 'success'],
        default : 'pending'
    },
    orderStatus : {
        type: [String],
        default: ['pending', 'pending', 'pending', 'pending']
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


OrderSchema.pre('save', function(next) {
    // Check if the fields of interest have been modified
    if(this.isModified('buyerPaymentStatus')) {
        this.orderStatus[0] = this.buyerPaymentStatus;
    }
    if(this.isModified('workAccepted')) {
        this.orderStatus[1] = this.workAccepted.status;
    }
    if(this.isModified('workApproval')) {
        this.orderStatus[2] = this.workApproval.status;
    }
    if(this.isModified('influencerPaymentStatus')) {
        this.orderStatus[3] = this.influencerPaymentStatus;
    }
    next();
});


export const Order = mongoose.model("order", OrderSchema);