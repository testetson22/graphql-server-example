import { Items } from './db.js';

const resolvers = {
    getItem: async ({ id }) => {
        try {
            return await Items.findById(id);
        } catch (error) {
            throw new Error(`Error fetching item with id ${id}: ${error.message}`);
        }
    },
    getAllItems: async () => {
        try {
            return await Items.find({});
        } catch (error) {
            throw new Error(`Error fetching all items: ${error.message}`);
        }
    },
    createItem: async ({ input }) => {
        const newItem = new Items({
            id: input.id,
            name: input.name,
            description: input.description,
            status: input.status,
            location: input.location,
            metadata: input.metadata
       });
        newItem.id = newItem._id;

        try {
            await newItem.save();
            return newItem;
        } catch (error) {
            throw new Error(`Error creating item: ${error.message}`);
        }
    },
    updateItem: async ({ input }) => {
        try {
            return await Items.findOneAndUpdate({ _id: input.id }, input, { new: true });
        } catch (error) {
            throw new Error(`Error updating item with id ${input.id}: ${error.message}`);
        }
    },
    deleteItem: async ({ id }) => {
        try {
            await Items.deleteOne({ _id: id });
            return 'Successfully deleted item';
        } catch (error) {
            throw new Error(`Error deleting item with id ${id}: ${error.message}`);
        }
    },
    deleteAllItems: async () => {
        try {
            await Items.collection.drop();
            return 'Successfully deleted all items';
        } catch (error) {
            throw new Error(`Error deleting all items: ${error.message}`);
        }
    }
};

export default resolvers;
