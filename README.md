# GraphQL Server Example

This is a simple GraphQL server using Express, Mongoose, and Babel with a fairly generic data model. The server uses a MongoDB backing store.

It is tested with Jest Unit and API tests.

## Setup

### Prerequisites

- Node.js
- MongoDB
    - [MongoDB Community with Docker](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/#install-mongodb-community-with-docker) is recommended.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/testetson22/graphql-server-example.git
    cd graphql-server-example
    ```

2. Install dependencies (use --force to avoid upstream dep issues):
    ```sh
    npm install --force
    ```

## Running the Server

### Via Docker
To start the server using Docker, follow these steps:

1. Optional: Build the GQL server:
    ```sh
    bash ./docker-build.sh
    ```

2. Run the GQL server and database:
    ```sh
    bash ./docker-run.sh
    ```

3. Optional: Stop and remove containers
    ```sh
    bash ./docker-stop-rm.sh
    ```

### Via npm
NOTE: You need to have a MongoDB instance running.

To start the server, run:
```sh
npm start
```

## Running Tests

To run the unit tests:
```sh
npm run unittest
```

To run the API tests:

NOTE: You need to have a MongoDB instance running.

```sh
npm run apitest
```

## GraphQL Schema

The GraphQL schema is defined in [data/item.graphql](data/item.graphql). It includes the following types and operations:

### Types

- `Item`
- `Status`
- `Location`

### Queries

- `getItem(id: ID): Item`
- `getAllItems: [Item]`

### Mutations

- `createItem(input: ItemInput): Item`
- `updateItem(input: ItemInput): Item`
- `deleteItem(id: ID!): String`
- `deleteAllItems: String`

## Resolvers

The resolvers for the GraphQL operations are implemented in [data/resolvers.js](data/resolvers.js).

## Database

The MongoDB connection is handled in [data/db.js](data/db.js). The item model is defined in [data/model.js](data/model.js).

## Testing

Unit tests for the resolvers are located in [test/unit/resolvers.test.js](test/unit/resolvers.test.js). API tests are located in [test/api/graphql.test.js](test/api/graphql.test.js). Helper functions for testing are in [test/helpers/helpers.js](test/helpers/helpers.js).

## TODO
- GitHub Actions for standing up the GQL server & DB and running API tests.