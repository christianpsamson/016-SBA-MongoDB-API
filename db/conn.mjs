//////////////////////////////////////////////////////////////////////////////////////////////////
// import the dependencies
//////////////////////////////////////////////////////////////////////////////////////////////////

import mongoose from "mongoose";
import dotenv from "dotenv";

//////////////////////////////////////////////////////////////////////////////////////////////////
// load environment variables from .env
//////////////////////////////////////////////////////////////////////////////////////////////////

dotenv.config();

const URL = process.env.MONGO_URL;

//////////////////////////////////////////////////////////////////////////////////////////////////
// function to connect to Mongo DB
//////////////////////////////////////////////////////////////////////////////////////////////////

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to mongo DB via mongoose");
  } catch (error) {
    console.log("Error in connecting to Mongo DB", error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// export the connectDb function to make it accessible from other modules
//////////////////////////////////////////////////////////////////////////////////////////////////

export default connectDb;
