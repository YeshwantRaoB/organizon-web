// lib/mongo.ts
import { MongoClient, Db, Collection } from "mongodb";
import { Cart } from "./types";

declare global {
  // allow global cache in dev to avoid reconnects
  var __mongoClientPromise: Promise<MongoClient> | undefined;
  var __mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "organizon";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so module reloads won't create new clients.
  if (!global.__mongoClientPromise) {
    client = new MongoClient(uri);
    global.__mongoClient = client;
    global.__mongoClientPromise = client.connect();
  }
  clientPromise = global.__mongoClientPromise;
} else {
  // In production, it's fine to create a new client per lambda cold start
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export async function getCartsCollection(): Promise<Collection<Cart>> {
  const connectedClient = await clientPromise;
  const db = connectedClient.db(dbName);
  return db.collection<Cart>("carts");
}
