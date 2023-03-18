import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conenctionParams = {
      dbName: process.env.DB_NAME,
    };

    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      conenctionParams
    );

    console.log(chalk.green.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.bold(`Error: ${error.message}`));
  }
};

export default connectDB;
