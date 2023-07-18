import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

// setup database
import sequelize from './database/db.js';
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

export default app;
