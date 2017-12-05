const fs = require('fs');
const assert = require('assert');

function readFile(filename) {
  return fs.readFileSync(filename, 'utf8').split('\n').map(x => parseInt(x));
}

function howManySteps1(jumps) {
  let index = 0, offset, steps = 0;
  while(jumps[index] !== undefined) {
    offset = jumps[index];
    jumps[index] += 1;
    index += offset;
    steps++;
  }
  return steps;
}

function howManySteps2(jumps) {
  let index = 0, offset, steps = 0;
  while(jumps[index] !== undefined) {
    offset = jumps[index];
    if(offset >= 3) {
      jumps[index] -= 1;
    } else {
      jumps[index] += 1;
    }
    index += offset;
    steps++;
  }
  return steps;
}

let unitTest = readFile('unit_test.txt');
let jumps = readFile('input.txt');

assert.equal(howManySteps1(unitTest), 5);

console.log('Part 1: ' + howManySteps1(jumps));


unitTest = readFile('unit_test.txt');
jumps = readFile('input.txt');

assert.equal(howManySteps2(unitTest), 10);

console.log('Part 1: ' + howManySteps2(jumps));