const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');

unitTestPartOne();
partOne();

function partOne(){
  let modules = input.split('\n').map(val => Number(val));
  let answer = modules.reduce((requiredFuel, mod) => requiredFuel + fuel(mod), 0);
  console.log(answer);
}



function fuel(weight) {
  return Math.floor(weight/3) - 2;
}


function unitTestPartOne() {
  assert.equal(fuel(12), 2);
  assert.equal(fuel(14), 2);
  assert.equal(fuel(1969), 654);
  assert.equal(fuel(100756), 33583);
  console.log('unit tests passed');
}
