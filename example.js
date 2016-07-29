const uarm = require('./lib/uarm.js');

const arm = new uarm('COM4');

var cqnc = require('cqnc');

function delay(time,done) {
	setTimeout(() => {
		console.log('done');
		done();
	},time);
}

function action(func, time, done) {
  func();
	setTimeout(()=> {
		done();
	},time)
}

arm.on('ready', () => {
  // arm.dettachAll();
  // arm.readCoords();
  //arm.moveTo(-4096, 13, 13);
  
  arm.readCoords();
  // cqnc()
  // .add(action, ()=> arm.moveTo(-13,13,12),2000)
  // .add(action, ()=> arm.moveTo(10000,200,12),2000)
  // .add(action, ()=> arm.moveTo(-13,200,300),2000)
  // .run(()=> {
  //   console.log('done');
  // })
})
