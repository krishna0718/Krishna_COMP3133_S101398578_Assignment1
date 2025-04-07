  /*const express = require("express");
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
  // app.use(cors());
  app.get('/', (req, res) => {
    res.send('🚀 Employee Management GraphQL API is running. Use /graphql to access the endpoint.');
  });

  app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
  }));
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
*/


const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Optional root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Employee Management GraphQL API is running. Use /graphql to access the endpoint.");
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded", // prevents memory overload in production
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
