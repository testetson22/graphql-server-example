import mongoose from "mongoose";
const collection_name = process.env.COLLECTION_NAME || 'itemsdb';

const itemSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    status: String,
    location: Array,
    metadata: String
});

const Items = mongoose.model(collection_name, itemSchema);

export { Items };