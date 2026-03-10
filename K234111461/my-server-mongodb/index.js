const express = require("express");
const app = express();
const port = 4000;
const morgan = require("morgan");
app.use(morgan("combined"));
//create default API
app.get("/", (req, res) => {
 res.send("Hello Restful API");
});
app.listen(port, () => {
 console.log(`My Server listening on port ${port}`);
});
const cors=require("cors")
app.use(cors())


const bodyParser=require("body-parser")
app.use(bodyParser.json())


const path=require("path")
app.use("/static",express.static(path.join(__dirname,"public")))
app.get("/", (req, res) => {
 res.send("This Web server is processed for MongoDB");
});


const { MongoClient, ObjectId } = require("mongodb");
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");
