const { cleanUp, callGQL } = require('../helpers/helpers.js');

const getAllItemsQuery = `
query {
    getAllItems {
        name
        id
    }
}
`;

const createItemMutation = `
mutation {
  createItem(input: {
    name: "Test Foo"
    description: "Test Description Foo"
    location: [{location: "Here"}]
    status: INUSE
  }) {
    name
    id
  }
}
`;

describe('GraphQL API Tests', () => {
  beforeEach(() => {
    cleanUp();
  });

  afterAll(() => {
    cleanUp();
  });

  it('should return no items for a valid getAllItems query against an empty collection', async () => {
    var response = await callGQL(getAllItemsQuery);
    expect(response.status).toBe(200);
    expect(response.body.data.getAllItems).toHaveLength(0);
  });

  it('should be able to createItem and getAllItems and return one item', async () => {
    var createResponse = await callGQL(createItemMutation);
    expect(createResponse.status).toBe(200);

    var getAllResponse = await callGQL(getAllItemsQuery);
    expect(getAllResponse.status).toBe(200);
    expect(getAllResponse.body.data.getAllItems).toHaveLength(1);
  });
});