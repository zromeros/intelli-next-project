import * as mongoDB from "mongodb";
import * as constants from "../utils/const";

export const collections: { books?: mongoDB.Collection | undefined } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    constants.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(constants.DB_NAME);

  const booksCollection: mongoDB.Collection = db.collection(
    constants.BOOKS_COLLECTION_NAME
  );

  collections.books = booksCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${booksCollection.collectionName}`
  );
}
