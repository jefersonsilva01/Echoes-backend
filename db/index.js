const mongoose = require("mongoose");

// const MONGO_URI = process.env.MONGO_URI_DEPLOY;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/echoes";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.log("Error connecting to mongo: ", err);
  });
