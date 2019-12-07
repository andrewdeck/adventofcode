const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('input.txt', 'utf8');

// unitTestOne();
// partOne();
// unitTestTwo();
partTwo();

function partOne() {
  computeMaxSignal(file);
}

function partTwo() {
  computeFeedbackMaxSignal(file);
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


function computeFeedbackMaxSignal(program) {
  let perms = permutator([5,6,7,8,9]);

  let maxOutput = 0, sequence;
  for(let p = 0; p < perms.length; p++) {
  // for(let p = 0; p < 1; p++) {
    let phases = perms[p];
    let output;
    let halted = false;
    let currentAmp = 0;
    
    let A = intcodeComputer(program.split(','), 0, [phases[0], 0]);
    let B = intcodeComputer(program.split(','), 0, [phases[1], ...A.outputs]);
    let C = intcodeComputer(program.split(','), 0, [phases[2], ...B.outputs]);
    let D = intcodeComputer(program.split(','), 0, [phases[3], ...C.outputs]);
    let E = intcodeComputer(program.split(','), 0, [phases[4], ...D.outputs]);
    let amps = [A,B,C,D,E];
    // console.log(A);
    let inputs = E.outputs;
    while(!halted) {
      let amp = amps[currentAmp % 5];
      let state = intcodeComputer(amp.state, amp.pointer, inputs);
      amps[currentAmp % 5] = state;
      inputs = state.outputs;
      if(currentAmp % 5 === 4) {
        // console.log(`E outputs: ${state.outputs.join(',')}`);
        output = state.outputs[state.outputs.length - 1];
        if(state.HALT) halted = true;
      }
      currentAmp++;
    }
    
    if(output > maxOutput) {
      maxOutput = output;
      sequence = phases;
    }
  }

  console.log(maxOutput);
  console.log(sequence);
  return maxOutput;
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

function unitTestTwo() {
  let program = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5';
  assert.equal(computeFeedbackMaxSignal(program), 139629729);
  console.log('first one passed');
  program = '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10';
  assert.equal(computeFeedbackMaxSignal(program), 18216);
}


function intcodeComputer(program, cur, inputs) {
  let outputs = [], HALT = false, needInput = false;

  function getParam(pos, instruction) {
    let mode = instruction.slice(-2-pos, -1-pos);
    let val;
    if(mode === '1') val = program[cur+pos];
    else val = program[program[cur+pos]];
    return Number(val);
  }

  function getInput() {
    let input;
    input = inputs.shift();
    return input;
  }

  while(!needInput) {
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
      let nextInput = getInput();
      if(nextInput === undefined){
        needInput = true;
      } else {
        program[dest] = nextInput;
        cur += 2;
      }
    } else if (opcode === 4) { // ouptut to input
      let source = program[cur+1];
      outputs.push(program[source]);
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
    } else if(opcode === 99) {
      HALT = true;
      break;
    } else {
      console.error('something went wrong');
      console.error(instruction);
      break;
    }
  }
  return {
    state: program,
    pointer: cur,
    outputs: outputs,
    HALT: HALT
  };
}

