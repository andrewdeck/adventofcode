const fs = require('fs');
const assert = require('assert');

let passwords = fs.readFileSync('passwords.txt', 'utf8');
passwords = passwords.split('\n');

function validatePassword1(password) {
  const words = password.split(' ');
  const unique = {};
  let word;
  for(let i=0;i<words.length;i++) {
    word = words[i];
    if(word in unique) return false;
    else unique[word] = true;
  }

  return true;
}

function validatePassword2(password) {
  const words = password.split(' ');
  const unique = {};
  let word;
  for(let i=0;i<words.length;i++) {
    word = words[i].split('').sort().join();
    if(word in unique) return false;
    else unique[word] = true;
  }

  return true;
}

assert.equal(validatePassword1('aa bb cc dd ee'), true);
assert.equal(validatePassword1('aa bb cc dd aa'), false);
assert.equal(validatePassword1('aa bb cc dd aaa'), true);

let count = 0;
for(let i=0;i<passwords.length;i++) {
  if(validatePassword1(passwords[i])) count++;
}
console.log("Part 1: " + count);


assert.equal(validatePassword2('abcde fghij'), true);
assert.equal(validatePassword2('abcde xyz ecdab'), false);
assert.equal(validatePassword2('a ab abc abd abf abj'), true);
assert.equal(validatePassword2('iiii oiii ooii oooi oooo'), true);
assert.equal(validatePassword2('oiii ioii iioi iiio'), false);

count = 0;
for(let i=0;i<passwords.length;i++) {
  if(validatePassword2(passwords[i])) count++;
}
console.log("Part 2: " + count);