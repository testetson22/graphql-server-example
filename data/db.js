import mongoose from "mongoose";
import { Items } from "./model.js";

const localhostDb = process.env.LOCALHOST_DB || 'mongodb://localhost/itemsdb';

async function connectMongo() {
    try {
        // mongoose will create the database if it doesn't exist
        await mongoose.connect(localhostDb);
        console.log(`Connected to MongoDB @ ${localhostDb}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

connectMongo();

export { Items };
