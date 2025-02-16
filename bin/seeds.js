const articles = [
  {
    "userId": "67ab6942963ac13374727536",
    "article": {
      "username": "J. S.",
      "title": "The Rise of Artificial Intelligence",
      "paragraph": "Artificial Intelligence (AI) is reshaping industries by automating processes, increasing efficiency, and enabling advanced data analysis...",
      "subtitle-0": "Ethical Challenges and Workforce Impact",
      "new-paragraph-1": "Despite its advantages, AI presents ethical and societal challenges...",
      "subtitle-2": "The Future of AI and Human Collaboration",
      "new-paragraph-3": "AI is not just about replacing human labor but also about enhancing human capabilities...",
      "description": "Artificial Intelligence (AI) enables machines to learn, reason, and make decisions...",
      "cover": "https://fastly.picsum.photos/id/357/766/638.jpg?hmac=fXNrUKVf_2Ohu9S-ZwPAzQ7BBDvsHZgrjCF-yIgGy6c"
    }
  },
  {
    "userId": "67ab6942963ac13374727536",
    "article": {
      "username": "M. T.",
      "title": "Climate Change: A Global Challenge",
      "paragraph": "Climate change is one of the most pressing issues of our time...",
      "subtitle-0": "Causes and Consequences",
      "new-paragraph-1": "Rising greenhouse gas emissions have led to extreme weather events, rising sea levels, and biodiversity loss...",
      "subtitle-2": "Solutions and Innovations",
      "new-paragraph-3": "Efforts such as renewable energy adoption, carbon capture technology, and sustainable practices are crucial to mitigating climate change...",
      "description": "Climate change impacts ecosystems, economies, and human lives. Innovative solutions and global cooperation are key to combating this crisis.",
      "cover": "https://fastly.picsum.photos/id/203/766/638.jpg?hmac=ZXhNRXh5GJ3JDZ4x3U9hDk1cA"
    }
  },
  {
    "userId": "67ab6942963ac13374727536",
    "article": {
      "username": "A. R.",
      "title": "The Future of Electric Vehicles",
      "paragraph": "Electric vehicles (EVs) are transforming the automotive industry...",
      "subtitle-0": "Environmental and Economic Benefits",
      "new-paragraph-1": "EVs produce zero emissions and are more energy-efficient than traditional gasoline-powered cars...",
      "subtitle-2": "Challenges and Innovations",
      "new-paragraph-3": "Despite advancements, EVs face challenges such as battery efficiency, charging infrastructure, and high initial costs...",
      "description": "Electric vehicles represent a cleaner, more efficient future for transportation, driven by advancements in battery technology and infrastructure.",
      "cover": "https://fastly.picsum.photos/id/1061/766/638.jpg?hmac=y2QwDmfQmV"
    }
  },
  {
    "userId": "67ab6942963ac13374727536",
    "article": {
      "username": "L. K.",
      "title": "Renewable Energy: The Path Forward",
      "paragraph": "Renewable energy sources like solar, wind, and hydro are essential for a sustainable future...",
      "subtitle-0": "Types of Renewable Energy",
      "new-paragraph-1": "Solar panels, wind turbines, and hydropower plants generate electricity with minimal environmental impact...",
      "subtitle-2": "Challenges and Innovations",
      "new-paragraph-3": "Improving energy storage and grid integration are key challenges for wider renewable energy adoption...",
      "description": "Renewable energy is vital for reducing dependence on fossil fuels and combating climate change, driving innovation in energy storage and efficiency.",
      "cover": "https://fastly.picsum.photos/id/1051/766/638.jpg?hmac=9vHdPshFq"
    }
  }
];

const mongoose = require("mongoose");
const Article = require("../models/Article.model");
require('dotenv/config');

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

Article.create(articles, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${articles.length} articles`)
  mongoose.connection.close();
})