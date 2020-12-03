const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');

let test = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;


assert.strictEqual(validPasswordsOne(test), 2);
let result = validPasswordsOne(input);
console.log('part one', result);

assert.strictEqual(validPasswordsTwo(test), 1);
result = validPasswordsTwo(input);
console.log('part two', result);


function validPasswordsTwo(input) {
  let passwords = parsePasswords(input);

  let validCount = 0;

  for(let i = 0; i < passwords.length; i++) {
    let {upper, lower, char, pass} = passwords[i];

    let matches = 0;
    if(pass.charAt(upper-1) === char ) matches++;
    if(pass.charAt(lower-1) === char) matches++;
    if(matches === 1) validCount++;
  }
  return validCount;
}


function validPasswordsOne(input) {
  let passwords = parsePasswords(input);

  let validCount = 0;

  for(let i = 0; i < passwords.length; i++) {
    let {upper, lower, char, pass} = passwords[i];
    let count = (pass.match(new RegExp(char, 'g')) || []).length;

    if(count >= lower && count <= upper) {
      validCount++;
    }
  }
  return validCount;
}

function parsePasswords(input) {
  let lines = input.split('\n');

  let results = [];

  for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let parts = line.split(' ');
    let [lower, upper] = parts[0].split('-').map(Number);
    let char = parts[1].charAt(0);
    let pass = parts[2];
    results.push({upper, lower, char, pass});
  } 
  return results;
}