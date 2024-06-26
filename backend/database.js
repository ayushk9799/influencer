import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@eazyycollab.nbb6hoj.mongodb.net/?retryWrites=true&w=majority&appName=eazyycollab`);
  } catch (error) {}
};

export default connectDatabase;
