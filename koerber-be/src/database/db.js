import { Sequelize } from 'sequelize';
import config from './config.js';

// Function to establish the database connection with retries
async function connectWithRetry() {
  const maxRetries = 10;
  let retries = 0;
  let connected = false;

  while (!connected && retries < maxRetries) {
    try {
      const sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: 'postgres',
        port: config.port,
      });

      await sequelize.authenticate();
      connected = true;
      console.log('Connected to the database!');
      return sequelize;
    } catch (error) {
      retries++;
      console.error(`Connection attempt ${retries} failed: ${error.message}`);
      // Wait for a short duration before the next retry (e.g., 5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error('Failed to connect to the database after multiple attempts.');
  process.exit(1);
}

const sequelize = await connectWithRetry();

export default sequelize;