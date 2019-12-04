const assert = require('assert');

const LOWER = 264793, UPPER = 803935;

// unitTestPartOne();
// partOne();
// unitTestPartTwo();
partTwo();

function partOne() {
  let passwdCount = 0;
  for(let i = LOWER; i < UPPER; i++) {
    if(isValidPassword(i)) {
      passwdCount++;
    }
  }
  console.log(passwdCount);
}

function partTwo() {
  let passwdCount = 0;
  for(let i = LOWER; i < UPPER; i++) {
    if(isValidPassword2(i)) {
      passwdCount++;
    }
  }
  console.log(passwdCount);
}


function isValidPassword(num) {
  let validOrder = true, hasDouble = false;
  let digits = (num+'').split('').map(x=>Number(x));
  for(let i=1; i<6;i++) {
    if(digits[i] === digits[i-1]) hasDouble = true;
    if(digits[i] < digits[i-1]) validOrder = false;
  }
  return validOrder && hasDouble;
}

function isValidPassword2(num) {
  let validOrder = true, hasValidDouble = false;
  let digits = (num+'').split('').map(x=>Number(x));
  for(let i=1; i<6;i++) {
    if(digits[i] < digits[i-1]) validOrder = false;
  }
  let count = [0,0,0,0,0,0,0,0,0,0];
  for(let i=0;i<6;i++) {
    count[digits[i]]++;
  }
  if(count.indexOf(2) > -1) hasValidDouble = true;
  return validOrder && hasValidDouble;
}


function unitTestPartOne() {
  assert.equal(isValidPassword(111111), true);
  assert.equal(isValidPassword(223450), false);
  assert.equal(isValidPassword(123789), false);
}

function unitTestPartTwo() {
  assert.equal(isValidPassword2(112233), true);
  assert.equal(isValidPassword2(123444), false);
  assert.equal(isValidPassword2(111122), true);
}