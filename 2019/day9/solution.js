const fs = require('fs');
const assert = require('assert');
const file = fs.readFileSync('input.txt', 'utf8');


// unitTestPartOne();
// partOne();
partTwo();

function partTwo() {
  intcodeComputer(file, 2);
}

function partOne() {
  intcodeComputer(file, 1);
}

function unitTestPartOne() {
  let program = '104,1125899906842624,99';
  assert.equal(intcodeComputer(program), 1125899906842624);

  program = '1102,34915192,34915192,7,4,7,99,0';
  assert.equal((intcodeComputer(program)+'').length, 16);

  program = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
  intcodeComputer(program);
}

function intcodeComputer(program, input) {
  program = program.split(',');
  let relativeBase = 0;

  let cur = 0;

  function getParam(pos, instruction) {
    let mode = instruction.slice(-2-pos, -1-pos);
    let val;
    if(mode === '1') val = program[cur+pos];
    else if(mode === '2') val = program[Number(program[cur+pos]) + relativeBase];
    else val = program[Number(program[cur+pos])];
    return Number(val) || 0;
  }

  while(program[cur] !== '99') {
    let instruction = program[cur]+'';
    if(instruction.length > 4) debugger;
    let opcode = Number(instruction.slice(-2));
    // console.log(instruction);
    // console.log(program.join(','));
    if(opcode === 1) { // add
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = Number(program[cur+3]);
      if(instruction.length > 4 && instruction.indexOf('2') === 0) dest += relativeBase;
      program[dest] = a + b;
      cur += 4;
    } else if(opcode === 2) {// multiply
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = Number(program[cur+3]);
      if(instruction.length > 4 && instruction.indexOf('2') === 0) dest += relativeBase;
      program[dest] = a * b;
      cur += 4;
    } else if (opcode === 3) { // write from input
      let dest = Number(program[cur+1]);
      if(instruction.indexOf('2') === 0) dest += relativeBase;
      program[dest] = input;
      cur += 2;
    } else if (opcode === 4) { // ouptut to input
      let output = getParam(1, instruction);
      console.log('output: ' + output);
      if(isNaN(output)) break;
      cur += 2;
    } else if(opcode === 5) {
      let a = getParam(1, instruction),
          b = getParam(2, instruction);
      if(a !== 0) { // jump
        cur = b;
      } else {
        cur += 3;
      }
    } else if(opcode === 6) {
      let a = getParam(1, instruction),
          b = getParam(2, instruction);
      if(a === 0) { // jump
        cur = b;
      } else {
        cur += 3;
      }
    } else if(opcode === 7) {
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = Number(program[cur+3]);
      if(instruction.length > 4 && instruction.indexOf('2') === 0) dest += relativeBase;
      program[dest] = a < b ? 1 : 0;
      cur += 4;
    } else if(opcode === 8) {
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = Number(program[cur+3]);
      if(instruction.length > 4 && instruction.indexOf('2') === 0) dest += relativeBase;
      program[dest] = a === b ? 1 : 0;
      cur += 4;
    } else if(opcode === 9) {
      let a = getParam(1, instruction);
      relativeBase += a;
      cur += 2;
    } else {
      console.error('something went wrong');
      console.error(instruction);
      break;
    }
  }

  return input;
}