import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(config.DB_NAME, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect
});

export default sequelize;
