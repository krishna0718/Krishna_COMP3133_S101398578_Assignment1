const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer } = require("apollo-server-express");
const cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");



//Calling the database
connectDB()
const app = express()
app.use(cors)


const server = new ApolloServer({ typeDefs, resolvers })
server.start().then(() => {
  server.applyMiddleware({ app })
  app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
})
