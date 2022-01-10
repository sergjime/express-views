const { MongoClient } = require("mongodb");
const dbName = "node-express";
const password = "Admingenius$$09";
const url = `mongodb+srv://sergjime:<${password}>@cluster0.uqdpq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("blogs");
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
  // the following code examples can be pasted here...

  return "done.";
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
