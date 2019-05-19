const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true,useCreateIndex: true })
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs: typeDefs,
  context: {
    User,
    Post
  }
});

server.listen().then(({ port }) => {
  console.log(`Server listening on port ${port}`);
});
