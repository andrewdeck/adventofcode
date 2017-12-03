const fs = require('fs');

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


if (sum1('1122') === 3 &&
    sum1('1111') === 4 &&
    sum1('1234') === 0 &&
    sum1('91212129') === 9) {
  console.log('Unit tests passed');
  console.log('Part 1: ' + sum1(input));
} else {
  console.log('Unit tests failed: part 1');
}

if (sum2('1212') === 6 &&
    sum2('1221') === 0 &&
    sum2('123425') === 4 &&
    sum2('123123') === 12 &&
    sum2('12131415') === 4) {
  console.log('Unit tests passed');
  console.log('Part 2: ' + sum2(input));
} else {
  console.log('Unit tests failed: part 2');
}