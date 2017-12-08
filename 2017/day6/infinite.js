const fs = require('fs');
const assert = require('assert');

function readFile(filename) {
  return fs.readFileSync(filename, 'utf8').split(' ').filter(x=>x!=='').map(x=>parseInt(x));
}

function findInfinite(memory) {
  const seen = [];
  let count = 0, length;
  while(seen.indexOf(memory.join(',')) === -1) {
    seen.push(memory.join(','));
    count++;
    let largest = 0;
    for(let i=0;i<memory.length;i++) {
      if(memory[i] > memory[largest]) largest = i;
    }
    let bank = memory[largest];
    memory[largest] = 0;
    for(let i=bank, j=1;i>0;i--, j++) {
      memory[(largest + j)%memory.length] += 1;
    }
  }
  length = count - seen.indexOf(memory.join(','))
  return {count: count, length: length};
}

let input = readFile('input.txt'),
    unit = readFile('unit.txt');

assert.equal(findInfinite(unit).count, 5);

console.log('Part 1: ' + findInfinite(input).count);

assert.equal(findInfinite(unit).length, 4);

console.log('Part 2: ' + findInfinite(input).length);