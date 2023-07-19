import Device from '../../models/Device.js';

/**
 * Get one Device by id.
 * @param id
 * @returns {Device}
 */
const get = async (id) => {
  return await Device.findByPk(id);
};

/**
 * Get Devices list.
 * @param skip
 * @param limit
 * @returns {Device[]}
 */
const list = async (skip = 0, limit = 50) => {
  return await Device.findAll({
    offset: skip,
    limit: limit
  });
};

/**
 * Create new Device
 * @param device
 * @property {String} device.name
 * @property {String} device.type
 * @property {String} device.ownerName
 * @property {number} device.batteryStatus
 * @returns {Device}
 */
const create = async (device) => {
  return await Device.create(device);
};

/**
 * Update Device
 * @param deviceId
 * @param device
 * @property {String} device.name
 * @property {String} device.type
 * @property {String} device.ownerName
 * @property {number} device.batteryStatus
 * @returns {Device}
 */
const edit = async (deviceId, device) => {
  return await Device.update(device, {
    where: {
      id: deviceId
    }
  });
};

/**
 * Delete device by id
 * @param id
 * @returns {Device}
 */
const remove = async (id) => {
  return await Device.destroy({
    where: {
      id: id
    }
  });
};

export default { get, list, create, edit, remove };
