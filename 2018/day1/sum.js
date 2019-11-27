const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');


console.log('Part 1: ' + eval(input)); // XD


assert.equal(sum2('1212'), 6);
assert.equal(sum2('1221'), 0);
assert.equal(sum2('123425'), 4);
assert.equal(sum2('123123'), 12);
assert.equal(sum2('12131415'), 4);

console.log('Part 2: ' + sum2(input));
