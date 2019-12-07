const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('input.txt', 'utf8');

// unitTestOne();
partOne();

function partOne() {
  computeMaxSignal(file);
}

function permutator(inputArr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);

  return result;
}

function computeMaxSignal(program) {
  let perms = permutator([0,1,2,3,4]);

  let maxOutput = 0, sequence;
  for(let p = 0; p < perms.length; p++) {
    let phases = perms[p];
    let input = 0;
    for(let i = 0; i<phases.length; i++) {
      input = intcodeComputer(phases[i], input, program);
    }
    if(input > maxOutput) {
      maxOutput = input;
      sequence = phases;
    }
  }

  console.log(maxOutput);
  console.log(sequence);
  return maxOutput;
}







function unitTestOne() {
  let program = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';
  assert.equal(computeMaxSignal(program), 43210);

  program = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0';
  assert.equal(computeMaxSignal(program), 54321);

  program = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0';
  assert.equal(computeMaxSignal(program), 65210);
}


function intcodeComputer(phase, signal, program) {
  program = program.split(',');
  let cur = 0, output;


  function getParam(pos, instruction) {
    let mode = instruction.slice(-2-pos, -1-pos);
    let val;
    if(mode === '1') val = program[cur+pos];
    else val = program[program[cur+pos]];
    return Number(val);
  }

  let inputCount = 0;
  function getInput() {
    let input;
    if(inputCount === 0) {
      input = phase;
    } else if(inputCount === 1) {
      input = signal;
    }
    inputCount++;
    return input;
  }

  while(program[cur] !== '99') {
    let instruction = program[cur]+'';
    let opcode = Number(instruction.slice(-2));
    if(opcode === 1) { // add
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = program[cur+3];

      program[dest] = a + b;
      cur += 4;
    } else if(opcode === 2) {// multiply
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = program[cur+3];
      program[dest] = a * b;
      cur += 4;
    } else if (opcode === 3) { // write from input
      let dest = program[cur+1];
      program[dest] = getInput();
      cur += 2;
    } else if (opcode === 4) { // ouptut to input
      let source = program[cur+1];
      output = program[source];
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
          dest = program[cur+3];
      program[dest] = a < b ? 1 : 0;
      cur += 4;
    } else if(opcode === 8) {
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = program[cur+3];
      program[dest] = a === b ? 1 : 0;
      cur += 4;
    } else {
      console.error('something went wrong');
      console.error(instruction);
      break;
    }
  }
  return output;
}

