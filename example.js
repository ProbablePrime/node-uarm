const uarm = require('./lib/uarm.js');

const arm = new uarm('COM4');

arm.on('data', () => {
  arm.dettachAll();
  arm.pumpStatus(1);
})
