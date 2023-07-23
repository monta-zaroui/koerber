import Device from '../models/Device.js';

export const generateDevices = () => {
  Device.bulkCreate([
    {
      name: 'Samsung Galaxy S21',
      type: 'SMARTPHONE',
      ownerName: 'John Smith',
      batteryStatus: 80
    },
    {
      name: 'Samsung Galaxy S22',
      type: 'SMARTPHONE',
      ownerName: 'Emma Johnson',
      batteryStatus: 60
    },
    {
      name: 'iPhone 11 Pro',
      type: 'SMARTPHONE',
      ownerName: 'Michael Davis',
      batteryStatus: 40
    },
    {
      name: 'iPhone 12 Pro Max',
      type: 'SMARTPHONE',
      ownerName: 'Sarah Wilson',
      batteryStatus: 95
    },
    {
      name: 'Google Pixel 5',
      type: 'SMARTPHONE',
      ownerName: 'David Roberts',
      batteryStatus: 75
    },
    {
      name: 'Google Pixel 6',
      type: 'SMARTPHONE',
      ownerName: 'Olivia Johnson',
      batteryStatus: 90
    },
    {
      name: 'iPad Air',
      type: 'TABLET',
      ownerName: 'William Davis',
      batteryStatus: 50
    },
    {
      name: 'iPad Pro',
      type: 'TABLET',
      ownerName: 'Sophia Wilson',
      batteryStatus: 70
    },
    {
      name: 'Canon EOS 5D Mark IV',
      type: 'CAMERA',
      ownerName: 'Ethan Smith',
      batteryStatus: 30
    },
    {
      name: 'Nikon D850',
      type: 'CAMERA',
      ownerName: 'Ava Anderson',
      batteryStatus: 85
    }
  ])
    .then(() => {
      console.log('Devices created');
    })
    .catch((err) => {
      console.log(err);
    });
};
