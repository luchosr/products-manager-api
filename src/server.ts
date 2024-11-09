import express from 'express';
import router from './router';
import db from './config/db';

// Connect to DB

async function connectDB() {
  try {
    await db.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.log(error);
    console.log('Error connecting to DB');
  }
}

connectDB();
const server = express();

server.use('/products', router);

//routing

export default server;
