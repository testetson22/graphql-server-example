const mockingoose = require('mockingoose');
const { Items } = require('../../data/model.js');
const resolvers = require('../../data/resolvers.js').default;

describe('GraphQL Resolvers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    describe('createItem', () => {
        it('should create a new item', async () => {
            const mockItem = {
                name: 'Item 1',
                description: 'Description1',
                status: 'available',
                location: ['Location 1'],
                metadata: 'foobar'
            };

            const mockInput = {
                ...mockItem
            };

            mockingoose(Items).toReturn(mockInput, 'save');

            const result = await resolvers.createItem({ input: mockInput });

            expect(result).toEqual(expect.objectContaining(mockItem));
            expect(typeof result.id).toBe("string")
            expect(result.id).toHaveLength(24);
        });

        it('should throw an error if item creation fails', async () => {
            const mockInput = {
                name: 'Item 2',
                description: 'Description2',
                status: 'available',
                location: ['Location 2'],
                metadata: 'foobar'
            };

            mockingoose(Items).toReturn(new Error('Error creating item'), 'save');

            await expect(resolvers.createItem({ input: mockInput })).rejects.toThrow('Error creating item');
        });
    });

    describe('getAllItems', () => {
        it('should return all items', async () => {
            const mockItems = [
                {
                    name: 'Item 1',
                    description: 'Description1',
                    status: 'available',
                    location: ['Location 1'],
                    metadata: 'foobar'
                },
                {
                    name: 'Item 2',
                    description: 'Description2',
                    status: 'unavailable',
                    location: ['Location 2'],
                    metadata: 'barfoo'
                }
            ];

            mockingoose(Items).toReturn(mockItems, 'find');

            const result = await resolvers.getAllItems();
            result.forEach((item, index) => {
                expect(typeof item._id).toBe("object")
                expect(item._id.toString()).toHaveLength(24);
                expect(item).toEqual(expect.objectContaining(mockItems[index]));
            });
        });

        it('should throw an error if fetching all items fails', async () => {
            mockingoose(Items).toReturn(new Error('Error fetching all items'), 'find');

            await expect(resolvers.getAllItems()).rejects.toThrow('Error fetching all items');
        });
    });

    describe('getItem', () => {
        it('should return an item by id', async () => {
            const mockItem = {
                name: 'Item 1',
                description: 'Description1',
                status: 'available',
                location: ['Location 1'],
                metadata: 'foobar'
            }

            const mockInput = {
                _id: '507f1f77bcf86cd799439011',
                ...mockItem
            };

            mockingoose(Items).toReturn(mockInput, 'findOne');

            const result = await resolvers.getItem({ id: '507f1f77bcf86cd799439011' });
            expect(result).toEqual(expect.objectContaining(mockItem));
            expect(typeof result._id).toBe("object");
            expect(result._id.toString()).toHaveLength(24);
        });

        it('should throw an error if fetching item by id fails', async () => {
            mockingoose(Items).toReturn(new Error('Error fetching item'), 'findOne');

            await expect(resolvers.getItem({ id: '507f1f77bcf86cd799439011' })).rejects.toThrow('Error fetching item with id 507f1f77bcf86cd799439011: Error fetching item');
        });
    });

    describe('updateItem', () => {
        it('should update an item', async () => {
            const mockItem = {
                id: '507f1f77bcf86cd799439011',
                name: 'Updated Item',
                description: 'Updated Description',
                status: 'unavailable',
                location: ['Updated Location'],
                metadata: 'updated'
            };

            const mockInput = {
                ...mockItem
            };

            mockingoose(Items).toReturn(mockInput, 'findOneAndUpdate');

            const result = await resolvers.updateItem({ input: mockInput });

            expect(result).toEqual(expect.objectContaining(mockItem));
            expect(typeof result._id).toBe("object");
            expect(result._id.toString()).toHaveLength(24);
        });

        it('should throw an error if item update fails', async () => {
            const mockInput = {
                id: '507f1f77bcf86cd799439011',
                name: 'Item 2',
                description: 'Description2',
                status: 'available',
                location: ['Location 2'],
                metadata: 'foobar'
            };

            mockingoose(Items).toReturn(new Error('Error updating item'), 'findOneAndUpdate');

            await expect(resolvers.updateItem({ input: mockInput })).rejects.toThrow('Error updating item with id 507f1f77bcf86cd799439011: Error updating item');
        });
    });

    describe('deleteItem', () => {
        it('should delete an item by id', async () => {
            mockingoose(Items).toReturn({}, 'deleteOne');

            const result = await resolvers.deleteItem({ id: '507f1f77bcf86cd799439011' });

            expect(result).toBe('Successfully deleted item');
        });

        it('should throw an error if item deletion fails', async () => {
            mockingoose(Items).toReturn(new Error('Error deleting item'), 'deleteOne');

            await expect(resolvers.deleteItem({ id: '507f1f77bcf86cd799439011' })).rejects.toThrow('Error deleting item with id 507f1f77bcf86cd799439011: Error deleting item');
        });
    });
});