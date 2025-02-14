/*const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");



//Calling the database
connectDB()




const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`:rocket: Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`))
*/







const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
