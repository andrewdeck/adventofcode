const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');

// unitTestPartOne();
// partOne();
// unitTestPartTwo();
partTwo();

function partOne(){
  let modules = input.split('\n').map(val => Number(val));
  let answer = modules.reduce((requiredFuel, mod) => requiredFuel + fuel(mod), 0);
  console.log(answer);
}

function partTwo() {
  let modules = input.split('\n').map(val => Number(val));
  let answer = modules.reduce((requiredFuel, mod) => requiredFuel + adjustedFuel(mod), 0);
  console.log(answer);
}

function adjustedFuel(weight) {
  let cost = fuel(weight);
  let totalCost = cost;
  while(cost > 0) {
    cost = fuel(cost);
    totalCost += cost;
  }
  return totalCost;
}

function fuel(weight) {
  return Math.max(Math.floor(weight/3) - 2, 0);
}


function unitTestPartOne() {
  assert.equal(fuel(12), 2);
  assert.equal(fuel(14), 2);
  assert.equal(fuel(1969), 654);
  assert.equal(fuel(100756), 33583);
  console.log('unit tests passed');
}


function unitTestPartTwo() {
  assert.equal(adjustedFuel(12), 2);
  assert.equal(adjustedFuel(1969), 966);
  assert.equal(adjustedFuel(100756), 50346);
  console.log('unit tests passed');
}