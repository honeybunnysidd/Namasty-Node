const { MongoClient } = require("mongodb");

url = "mongodb://localhost:27017";

const client = new MongoClient(url);

// Database Name
const dbName = "NN";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("DB connected Successfully");
  const db = client.db(dbName);
  const collection = db.collection("User");

  //Insert s document
  const insertResult = await collection.insertOne({
    fName: "Honey",
    lName: "Bunny",
    city: "Delhi",
    country: "India",
    contact: 5698543210,
  });
  console.log("Inserted documents =>", insertResult);

  //Update a document
  const updateResult = await collection.updateOne(
    { fName: "Honey" },
    { $set: { fName: "Stupid" } }
  );

  // Find all document
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
}

main()
  .catch(console.error)
  .finally(() => client.close());
