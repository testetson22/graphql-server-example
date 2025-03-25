import mongoose from "mongoose";
import path from "path";
import { Items } from "./model.js";

const mongoDbCollection = process.env.MONGODB_COLLECTION || 'itemsdb';
const mongoDbHost = process.env.MONGODB_HOST || 'localhost';
const mongoDbUsername = process.env.MONGODB_USERNAME || '';
const mongoDbPassword = process.env.MONGODB_PASSWORD || '';

async function connectWithOptions() {
    if (mongoDbUsername && mongoDbPassword) {
        let caFile = path.join('global-bundle.pem');
        let options = {
            tls: true,
            tlsCAFile: caFile,
            replicaSet: 'rs0',
            readPreference: 'secondaryPreferred',
            retryWrites: false
        }
        await mongoose.connect(`mongodb://${mongoDbUsername}:${mongoDbPassword}@${mongoDbHost}/${mongoDbCollection}`, options);
    } else {
        await mongoose.connect(`mongodb://${mongoDbHost}/${mongoDbCollection}`);
    }
}

async function connectMongo() {
    try {
        // mongoose will create the database if it doesn't exist
        await connectWithOptions();
        console.log(`Connected to MongoDB @ ${mongoDbHost}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

connectMongo();

export { Items };
