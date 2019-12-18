const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input', 'utf8');


// console.log(fft(file, 100).substr(0,8));

console.log(realSignal('03036732577212944063491565474664'));

function realSignal(input) {
  let address = Number(input.substr(0,7));
  let fullSignal = input;
  for(let i = 0; i < 10000; i++) {
    fullSignal += input;
  }

  let result = fft(fullSignal, 100);

  return result.substr(address, 8);
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