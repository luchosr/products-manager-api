import express from 'express';
import router from './router';
import colors from 'colors';
import db from './config/db';

// Connect to DB

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.green.bold('Database connected'));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold('Error connecting to DB'));
  }
}

connectDB();
const server = express();

server.use(express.json());
server.use('/api/products', router);

export default server;
