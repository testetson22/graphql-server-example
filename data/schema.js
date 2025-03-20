import { buildSchema } from "graphql";
import fs from 'fs';

const schemaString = fs.readFileSync('./data/item.graphql', 'utf-8');
const schema = buildSchema(schemaString);

export default schema;
