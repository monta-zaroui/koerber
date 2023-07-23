import Joi from 'joi';
import express from 'express';
import httpStatus from 'http-status';
import deviceController from './device.controller.js';

const postSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('SMARTPHONE', 'TABLET', 'CAMERA').required(),
  ownerName: Joi.string().required(),
  batteryStatus: Joi.number().min(0).max(100).required()
});

const router = express.Router();

/**
 * GET /devices
 * @summary Get a list of devices
 * @param {number} skip.query - Number of devices to be skipped
 * @param {number} limit.query - Limit number of devices to be returned
 * @return {[Device]} 200
 */
router.get('/', async (req, res) => {
  try {
    const devices = await deviceController.list(req.query.skip, req.query.limit);
    return res.status(httpStatus.OK).json(devices);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

/**
 * GET /devices/{id}
 * @summary Get a device
 * @param {number} id - id of device
 * @return {Device} 200 - Device object
 */
router.get('/:id', async (req, res) => {
  try {
    const device = await deviceController.get(req.params.id);
    return res.status(httpStatus.OK).json(device);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

/**
 * POST /devices
 * @summary Create a new device
 * @param {Device} request.body.required - Device object
 * @return {Device} 201 - Device object
 */
router.post('/', async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json(error.message);
    }
    const device = await deviceController.create(req.body);
    return res.status(httpStatus.CREATED).json(device);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

/**
 * PATCH /devices/{id}
 * @summary Update a device
 * @param {Device} request.body.required - Device object
 * @return {Device} 200 - Device object
 */
router.patch('/', async (req, res) => {
  try {
    const device = await deviceController.edit(req.body);
    return res.status(httpStatus.OK).json(device);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

/**
 * DELETE /devices/{id}
 * @summary Delete a device
 * @param {number} id - id of device
 * @return {Device} 200 - Device object
 */
router.delete('/:id', async (req, res) => {
  try {
    const device = await deviceController.remove(req.params.id);
    return res.status(httpStatus.OK).json(device);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

export default router;
