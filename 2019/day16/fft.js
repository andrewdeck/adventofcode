const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input', 'utf8');


// console.log(fft(file, 100).substr(0,8));

console.log(realSignal('03036732577212944063491565474664'));
console.log(realSignal('02935109699940807407585447034323'));
console.log(realSignal('03081770884921959731165446850517'));
console.log(realSignal(file));

function realSignal(input) {
  let address = Number(input.substr(0,7));
  let fullSignal = '';
  for(let i = 0; i < 10000; i++) {
    fullSignal += input;
  }

  let meaningful = fullSignal.slice(address).split('').map(Number);

  for(let i = 0; i < 100; i++) {
    let output = meaningful.slice();
    for(let j = meaningful.length-2; j>=0; j--) {
      output[j] = output[j+1] + meaningful[j];
    }
    meaningful = output.map(x => x % 10);
  }

  return meaningful.slice(0, 8).join('');
}

function fft(input, numPhases) {
  let patterns = buildPatterns(input);

  let digits = input.split('').map(d => Number(d));

  const LEN = digits.length;

  for(let i = 0; i<numPhases; i++) {
    let output = [];
    for(let j = 0; j < LEN; j++) {
      let sum = 0;
      for(let k = 0; k < LEN; k++) {
        sum += digits[k] * patterns[j][k];
      }
      output[j] = Math.abs(sum%10);
    }

    digits = output;
  }

  return digits.join('');
}

function buildPatterns(input) {
  const length = input.split('').length;
  let base = [0, 1, 0, -1];

  let patterns = [];

  for(let i = 0; i < length; i++) {
    let pattern = [];
    let baseMod = base.reduce((ary, baseNum) => {
      let times = i+1;
      for(let j = 0; j<times; j++) {
        ary.push(baseNum);
      }
      return ary;
    }, []);

    let swap = baseMod.shift();
    baseMod.push(swap);

    for(let j = 0; j<length; j++) {
      pattern[j] = baseMod[j%baseMod.length];
    }

    patterns[i] = pattern;
  }

  return patterns;
}