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
    workAccepted : { // by influencer
        type : Boolean,
        default : false
    },
    workApproval : { // by buyer
        type : Boolean,
        default : false
    },
    influencerPaymentStatus : {
        type : String,
        enum : ['pending', 'failed', 'success'],
        default : 'pending'
    },
    orderStatus : {
        type: [Boolean],
        default: [false, false, false, false]
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

// OrderSchema.post('save', async (doc) => {
//     try {
//         const User = mongoose.model('user');
//         await User.findByIdAndUpdate(doc.buyer, { $push: { order: doc._id } });
//     } catch (error) {
//         console.error('Error updating user with order ID:', error);
//     }
// })

OrderSchema.pre('save', function(next) {
    // Check if the fields of interest have been modified
    if (this.isModified('buyerPaymentStatus') || this.isModified('workAccepted') || this.isModified('workApproval') || this.isModified('influencerPaymentStatus')) {
        // Initialize orderStatus array
        // this.orderStatus = [false, false, false, false];

        // Set the orderStatus based on the conditions of the fields
        if (this.buyerPaymentStatus === 'success') {
            this.orderStatus[0] = true;
        }
        if (this.workAccepted === true) {
            this.orderStatus[1] = true;
        }
        if (this.workApproval === true) {
            this.orderStatus[2] = true;
        }
        if (this.influencerPaymentStatus === 'success') {
            this.orderStatus[3] = true;
        }
    }
    next();
});


export const Order = mongoose.model("order", OrderSchema);