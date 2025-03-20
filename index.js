import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema.js';
import resolvers from './data/resolvers.js';

const PORT = 8080;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`Running GraphQL server on localhost:${PORT}/graphql`));

export default app;