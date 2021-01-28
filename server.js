const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url =
  "mongodb+srv://admin:tributes123@cluster0.seqic.mongodb.net/tributes?retryWrites=true&w=majority";

// Database Name
const dbName = "tributes";

app.get("/", (req, res) => {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    function (err, client) {
      err && console.log(err);
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      db.collection("tr1")
        .find({})
        .toArray((e, x) => {
          console.log(x);
          res.json(x);
        });

      client.close();
    }
  );
});

app.post("/submit", (req, res) => {
  const { name, body } = req.body;
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    function (err, client) {
      err && console.log(err);
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      db.collection("tr1").insertMany([{ name, body }]);

      client.close();
    }
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
