const { MongoClient } = require("mongodb");

// Connection URL
// const url = "mongodb://localhost:27017/Practice";
const url =
  "mongodb+srv://honeybunnysidd:CXjv4rxtxEaiLb6R@cluster0.iyb4g.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "Practice";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user");

  //Create a data
  const data = {
    name: "Honey Bunny",
    age: "23",
  };
  //update the data
  const updateResult = await collection.updateOne(
    { name: "Honey Bunny" },
    { $set: { name: "Stupid" } }
  );
  console.log("Updated documents =>", updateResult);

  // the following code examples can be pasted here...

  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  return "done.";
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
