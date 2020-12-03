const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');

let test = `1721
979
366
299
675
1456`;
assert.strictEqual(findPair(test.split('\n').map(Number)), 514579);
let result = findPair(input.split('\n').map(Number));
console.log('part one', result);

assert.strictEqual(findTrio(test.split('\n').map(Number)), 241861950);
result = findTrio(input.split('\n').map(Number));
console.log('part two', result);

function findPair(numbers) {
  const target = 2020;
  for(let i = 0; i < numbers.length; i++) {
    for(let j = i+1; j < numbers.length; j++) {
      if(numbers[j] + numbers[i] === target) {
        return numbers[j] * numbers[i];
      }
    }
  }
}

function findTrio(numbers) {
  const target = 2020;
  for(let i = 0; i < numbers.length; i++) {
    let numI = numbers[i];
    for(let j = i; j < numbers.length; j++) {
      let numJ = numbers[j];
      for(let k = j; k < numbers.length; k++) {
        let numK = numbers[k];
        if(numI + numJ + numK === target) {
          return numI * numJ * numK;
        }
      }
    }
  }
}
