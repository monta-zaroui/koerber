import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';
import { generateDevices } from './seeds/devices.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

// setup database
import sequelize from './database/db.js';
sequelize
  .sync()
  .then(() => {
    console.log('Database & tables created!');
    generateDevices();
  })
  .catch((error) => {
    console.log('Error connecting to the database:', error);
  });

app.use('/koerber', routes);

export default app;
