const request = require('supertest');
const URI = 'localhost:8080'

async function callGQL(input) {
    try {
        var response = await request(URI)
            .post('/graphql?')
            .send({ query: input });

        if (response.body.errors) {
            throw new Error(response.body.errors[0].message);
        }

        return response;
    } catch (error) {
        console.error('Error during API cleanup:', error);
        throw error;
    }
}

async function cleanUp() {
    var query = `
        mutation {
            deleteAllItems
        }
    `;

    try {
        var response = await callGQL(query);

        if (response.body.errors) {
            throw new Error(response.body.errors[0].message);
        }

        return response.body.data;
    } catch (error) {
        console.error('Error during API cleanup:', error);
        throw error;
    }
}

export { cleanUp, callGQL };