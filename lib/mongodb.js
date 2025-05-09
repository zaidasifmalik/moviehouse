import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client
      .connect()
      .then((connectedClient) => {
        console.log("MongoDB connected successfully");
        return connectedClient;
      })
      .catch((err) => {
        console.error("MongoDB connection failed:", err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client
    .connect()
    .then((connectedClient) => {
      console.log("MongoDB connected successfully");
      return connectedClient;
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      throw err;
    });
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("moviehouse");
}
