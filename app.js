import { ApolloServer, AuthenticationError } from 'apollo-server';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from './models/User';
import Post from './models/Post';
import resolvers from './resolvers';

dotenv.config();
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('database connected'))
  .catch(err => console.log(err));

const getUser = async (token) => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        ' Your session has ended. Please sign in again',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    return {
      User,
      Post,
      currentUser: await getUser(token),
    };
  },
});

server.listen(3000).then(({ port }) => {
  console.log(`Server listening on port ${port}`);
});
