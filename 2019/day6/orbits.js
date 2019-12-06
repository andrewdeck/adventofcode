const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('input.txt', 'utf8');

// unitTestOne();
// partOne();
// unitTestTwo();
partTwo();

function partTwo() {
  console.log(orbitDistance(file));
}

function partOne() {
  console.log(countOrbits(file));
}

function orbitDistance(orbits) {
  let bodies = {};

  orbits.split('\n').forEach(orbit => {
    let [orbitee, orbiter] = orbit.split(')');
    bodies[orbiter.trim()] = orbitee.trim();
  });

  let you = [];
  let orbitee = bodies['YOU'];
  while(orbitee) {
    you.unshift(orbitee);
    orbitee = bodies[orbitee];
  }
  let san = [];
  orbitee = bodies['SAN'];
  while(orbitee) {
    san.unshift(orbitee);
    orbitee = bodies[orbitee];
  }
  let distance;
  for(let i = 0; i< you.length; i++) {
    if(you[i] !== san[i]) {
      distance = san.length + you.length - (2 * i);
      break;
    }
  }

  return distance;
}

function countOrbits(orbits) {
  let bodies = {};

  orbits.split('\n').forEach(orbit => {
    let [orbitee, orbiter] = orbit.split(')');
    bodies[orbiter.trim()] = orbitee.trim();
  });
  let count = 0;
  Object.keys(bodies).forEach(body => {
    let orbitee = bodies[body];
    let branch = 0;
    while(orbitee) {
      branch++;
      orbitee = bodies[orbitee];
    }
    count += branch;
  });
  return count;
}



function unitTestOne() {
  let testInput = `COM)B
  B)C
  C)D
  D)E
  E)F
  B)G
  G)H
  D)I
  E)J
  J)K
  K)L`;
  assert.equal(countOrbits(testInput), 42);
}

function unitTestTwo() {
  let testInput = `COM)B
  B)C
  C)D
  D)E
  E)F
  B)G
  G)H
  D)I
  E)J
  J)K
  K)L
  K)YOU
  I)SAN`;
  assert.equal(orbitDistance(testInput), 4);
}
