import mongoose from "mongoose";
import { serverLogger } from "../logs/functions/server.log.js";

const connectDatabase = async function(uri) {
    try {
        await mongoose.connect(uri);
        serverLogger.info("Succesfully connected to Database");
    } catch (error) {
        serverLogger.error(error.message);
        process.exit(1);
    }
}

export default connectDatabase;