import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri).then((connectedClient) => {
      client = connectedClient;
      return connectedClient;
    });
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const mongoClient = await getMongoClient();
  const dbName = process.env.MONGODB_DB_NAME || new URL(uri).pathname.replace(/^\//, '') || 'organizon';
  return mongoClient.db(dbName);
}

export default getDb;
