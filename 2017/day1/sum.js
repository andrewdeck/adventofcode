const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');


function sum1(str) {
  const ary = str.split('').map(x => parseInt(x));
  let sum = 0;
  const len = ary.length;
  for(let i = 0;i<len;i++) {
    if(ary[i] === ary[(i+1)%len]) sum += ary[i];
  }
  return sum;
}

function sum2(str) {
  const ary = str.split('').map(x => parseInt(x));
  let sum = 0;
  const len = ary.length;
  const half = len/2;
  for(let i = 0;i<len;i++) {
    if(ary[i] === ary[(i+half)%len]) sum += ary[i];
  }
  return sum;
}


assert.equal(sum1('1122'), 3);
assert.equal(sum1('1111'), 4);
assert.equal(sum1('1234'), 0);
assert.equal(sum1('91212129'), 9);

console.log('Part 1: ' + sum1(input));


assert.equal(sum2('1212'), 6);
assert.equal(sum2('1221'), 0);
assert.equal(sum2('123425'), 4);
assert.equal(sum2('123123'), 12);
assert.equal(sum2('12131415'), 4);

console.log('Part 2: ' + sum2(input));
