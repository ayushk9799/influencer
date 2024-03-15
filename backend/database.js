import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/influencer');
    console.log("mongoose connection established");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log(error.code);
    console.log("mongoose connection not established");
   
  }
};

export default connectDatabase;
