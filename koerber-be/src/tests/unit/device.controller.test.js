import chai from 'chai';
import { describe } from 'mocha';
import { faker } from '@faker-js/faker';
import deviceController from '../../modules/device/device.controller.js';

const { expect } = chai;
chai.config.includeStack = true;

const device = {
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  type: faker.helpers.arrayElement(['SMARTPHONE', 'TABLET', 'CAMERA']),
  ownerName: faker.person.fullName(),
  batteryStatus: faker.number.int({ min: 0, max: 100 })
};

describe('Device controller unit tests', () => {
  it('should be created correctly', async () => {
    const createdDevice = await deviceController.create(device);
    expect(createdDevice.name).to.equal(device.name);
    expect(createdDevice.type).to.equal(device.type);
    expect(createdDevice.ownerName).to.equal(device.ownerName);
    expect(createdDevice.batteryStatus).to.equal(device.batteryStatus);
  });

  it('should find one device correctly', async () => {
    const foundDevice = await deviceController.get(device.id);
    expect(foundDevice.name).to.equal(device.name);
    expect(foundDevice.type).to.equal(device.type);
    expect(foundDevice.ownerName).to.equal(device.ownerName);
    expect(foundDevice.batteryStatus).to.equal(device.batteryStatus);
  });

  it('should find all devices correctly', async () => {
    const data = await deviceController.list();
    expect(data).to.be.an('array');
  });

  it('should delete one device correctly', async () => {
    await deviceController.remove(device.id);
    try {
      await device.get(device.id);
    } catch (e) {
      expect(e).to.exist;
    }
  });
});
