const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// dubai-jobTask
// v0bn3GMrv9IypXus

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsh8x1y.mongodb.net/?retryWrites=true&w=majority`;
// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("user").collection("frozen");

    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    app.get("/user" , async (req, res)=>{
        const result = await userCollection.find().toArray();
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Jod-Task server is Running");
});

app.listen(port, () => {
  console.log(`Jod-Task Server Is Running on Port ${port}`);
});
