import express from 'express';
import deviceRoutes from './modules/device/device.routes.js';

const router = express.Router();

/**
 * GET /healthcheck - Check service health
 */
router.get('/healthcheck', (req, res) =>
  res.json({
    server_time: new Date().toISOString(),
    timezone: new Date().toLocaleString('en-US', { timeZoneName: 'short' }).split(' ').pop(),
    version: process.env.npm_package_version
  })
);

router.use('/devices', deviceRoutes);

export default router;
