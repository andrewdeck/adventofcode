const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');

const input = fs.readFileSync('input.txt', 'utf8');

assert.strictEqual(seatId('BFFFBBFRRR'), 567);
assert.strictEqual(seatId('FFFBBBFRRR'), 119);
assert.strictEqual(seatId('BBFFBBFRLL'), 820);
let result = maxSeatId(input);
console.log('part one ', result);

result = missingSeat(input);
console.log('part two ', result);


function seatId(pass) {
  pass = pass.replace(/B|R/g,'1').replace(/F|L/g,'0');
  let row = parseInt(pass.substring(0,7),2),
      col = parseInt(pass.substring(7,10),2);
  
  return (row * 8) + col;
}

function maxSeatId(input) {
  let max = 0;
  input.split('\n').forEach(seat => {
    let id = seatId(seat);
    if(id > max) max = id;
  });

  return max;
}

function missingSeat(input) {
  let ids = [];
  input.split('\n').forEach(seat => {
    let id = seatId(seat);
    ids.push(id);
  });
  let sorted = ids.sort();
  let prev = sorted[0];
  let missing;
  for(let i = 1; i < sorted.length; i++) {
    if(sorted[i] !== prev +1) {
      missing = prev+1;
      break;
    }

    prev = sorted[i];
  }
  return missing;
}