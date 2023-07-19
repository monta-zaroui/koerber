import httpStatus from 'http-status';
import chai from 'chai';
import { faker } from '@faker-js/faker';
import initializeChai from '../chai.js';
import app from '../../app.js';

initializeChai();

const { expect } = chai;
chai.config.includeStack = true;

const device = {
  name: faker.commerce.productName(),
  type: faker.helpers.arrayElement(['SMARTPHONE', 'TABLET', 'CAMERA']),
  ownerName: faker.person.fullName(),
  batteryStatus: faker.number.int({ min: 0, max: 100 })
};

describe('Device e2e tests', () => {
  /**
   * Test the POST /devices route
   */
  it('should create a new device', async () => {
    const res = await chai.request(app).post('/devices').send(device);
    expect(res).to.have.status(httpStatus.CREATED);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.equal(device.name);
    expect(res.body.type).to.equal(device.type);
    expect(res.body.ownerName).to.equal(device.ownerName);
    expect(res.body.batteryStatus).to.equal(device.batteryStatus);
    device.id = res.body.id;
  });

  /**
   * Test the GET /devices route
   */
  it('should get all devices', async () => {
    const res = await chai.request(app).get('/devices');
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.be.an('array');
  });

  /**
   * Test the GET /devices/:id route
   */
  it('should get one device', async () => {
    const res = await chai.request(app).get(`/devices/${device.id}`);
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.equal(device.name);
    expect(res.body.type).to.equal(device.type);
    expect(res.body.ownerName).to.equal(device.ownerName);
    expect(res.body.batteryStatus).to.equal(device.batteryStatus);
  });

  /**
   * Test the DELETE /devices/:id route
   */
  it('should delete a device', async () => {
    const res = await chai.request(app).delete(`/devices/${device.id}`);
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.equal(1);
  });
});
