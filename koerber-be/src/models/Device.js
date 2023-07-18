import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['SMARTPHONE', 'TABLET', 'CAMERA']]
    }
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  batteryStatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  }
});

export default Device;
