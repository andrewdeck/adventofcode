const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input.txt', 'utf8');

// unitTestPartOne();
// partOne();
// unitTestPartTwo();
partTwo();

function calculatePairsIndex(array) {
  let pairs = [];
  for(let a = 0; a < array.length; a++) {
    for(let b = a+1; b < array.length; b++) {
      pairs.push({a,b});
    }
  }
  return pairs;
}

function applyGravity(moonA, moonB) {
  let a = moonA.pos,
      b = moonB.pos;

  if(a.x < b.x) {
    moonA.vel.x++;
    moonB.vel.x--;
  } else if(a.x > b.x){
    moonA.vel.x--;
    moonB.vel.x++;
  }
  if(a.y < b.y) {
    moonA.vel.y++;
    moonB.vel.y--;
  } else if(a.y > b.y){
    moonA.vel.y--;
    moonB.vel.y++;
  }
  if(a.z < b.z) {
    moonA.vel.z++;
    moonB.vel.z--;
  } else if(a.z > b.z){
    moonA.vel.z--;
    moonB.vel.z++;
  }
}

function partOne() {
  console.log(calculateTotalEnergy(file, 1000));
}

function partTwo() {
  console.log(calculateStepsToRepeatLCM(file));
}


function calculateStepsToRepeatLCM(data) {
  let moons = data.split('\n').map(row => {
    let x = Number(row.match(/x=(-?\d*)/)[1]),
        y = Number(row.match(/y=(-?\d*)/)[1]),
        z = Number(row.match(/z=(-?\d*)/)[1]);
    return {
      pos: {x,y,z},
      vel: {x:0,y:0,z:0}
    };
  });

  let originalXs = key(moons, 'x'),
      originalYs = key(moons, 'y'),
      originalZs = key(moons, 'z');
  let xPeriod = 0, yPeriod = 0, zPeriod = 0;

  let pairs = calculatePairsIndex(moons);

  let steps = 0;
  while(!xPeriod || !yPeriod || !zPeriod) {
    // apply gravity
    pairs.forEach(pair => {
      applyGravity(moons[pair.a], moons[pair.b]);
    });
    // apply velocity
    for(let m = 0; m < moons.length; m++) {
      let moon = moons[m];
      moon.pos.x += moon.vel.x;
      moon.pos.y += moon.vel.y;
      moon.pos.z += moon.vel.z;
    }
    steps++;
    if(!xPeriod) {
      if(_.isEqual(key(moons, 'x'), originalXs)) {
        console.log(`Setting xPeriod: ${steps}`);
        // console.log(moons.map(moon => moon.pos.x));
        xPeriod = steps;
      }
    }
    if(!yPeriod) {
      if(_.isEqual(key(moons, 'y'), originalYs)) {
        console.log(`Setting yPeriod: ${steps}`);
        // console.log(moons.map(moon => moon.pos.y));

        yPeriod = steps;
      }
    }
    if(!zPeriod) {
      if(_.isEqual(key(moons, 'z'), originalZs)) {
        console.log(`Setting zPeriod: ${steps}`);
        // console.log(moons.map(moon => moon.pos.z));

        zPeriod = steps;
      }
    }
  }

  return lcm(xPeriod, yPeriod, zPeriod);
}

function key(moons, k) {
  let array = [];
  moons.forEach(moon => {
    array.push(moon.pos[k]);
    array.push(moon.vel[k]);
  });
  return array;
}

function lcm(a,b,c) {
  
}


// this will take an insanely long ammount of time, do not run
function calculateStepsToRepeat(data) {
  let moons = data.split('\n').map(row => {
    let x = Number(row.match(/x=(-?\d*)/)[1]),
        y = Number(row.match(/y=(-?\d*)/)[1]),
        z = Number(row.match(/z=(-?\d*)/)[1]);
    return {
      pos: {x,y,z},
      vel: {x:0,y:0,z:0}
    };
  });

  let original = JSON.stringify(moons);
  let pairs = calculatePairsIndex(moons);

  let repeat = false;
  let steps = 0;
  while(!repeat) {
    // apply gravity
    pairs.forEach(pair => {
      applyGravity(moons[pair.a], moons[pair.b]);
    });
    // apply velocity
    for(let m = 0; m < moons.length; m++) {
      let moon = moons[m];
      moon.pos.x += moon.vel.x;
      moon.pos.y += moon.vel.y;
      moon.pos.z += moon.vel.z;
    }
    steps++;
    if(JSON.stringify(moons) === original) repeat = true;
    if(steps > 4686874924) break;
    if(steps % 10000000 === 0) console.log(`steps: ${steps}`);
  }
  return steps;
}

function calculateTotalEnergy(data, atStep) {
  let moons = data.split('\n').map(row => {
    let x = Number(row.match(/x=(-?\d*)/)[1]),
        y = Number(row.match(/y=(-?\d*)/)[1]),
        z = Number(row.match(/z=(-?\d*)/)[1]);
    return {
      pos: {x,y,z},
      vel: {x:0,y:0,z:0}
    };
  });

  let pairs = calculatePairsIndex(moons);

  for(let step = 0; step < atStep; step++) {
    console.log(moons);
    // apply gravity
    pairs.forEach(pair => {
      applyGravity(moons[pair.a], moons[pair.b]);
    });
    // apply velocity
    for(let m = 0; m < moons.length; m++) {
      let moon = moons[m];
      moon.pos.x += moon.vel.x;
      moon.pos.y += moon.vel.y;
      moon.pos.z += moon.vel.z;
    }
  }
  console.log(moons);
  let totalEnergy = 0;
  // calculate total energy
  moons.forEach(moon => {
    let {x,y,z} = moon.pos;
    let potEng = Math.abs(x) + Math.abs(y) + Math.abs(z);
    let {x:vx,y:vy,z:vz} = moon.vel;
    let kinEng = Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
    console.log(potEng, kinEng, (potEng * kinEng), totalEnergy);
    totalEnergy += (potEng * kinEng);
  });

  return totalEnergy;
}



function unitTestPartOne() {
  let data = `<x=-1, y=0, z=2>
  <x=2, y=-10, z=-7>
  <x=4, y=-8, z=8>
  <x=3, y=5, z=-1>`;
  console.log(calculateTotalEnergy(data, 10));
}

function unitTestPartTwo() {
  let data = `<x=-8, y=-10, z=0>
  <x=5, y=5, z=10>
  <x=2, y=-7, z=3>
  <x=9, y=-8, z=-3>`;
  assert.equal(calculateStepsToRepeatLCM(data), 4686774924);
}