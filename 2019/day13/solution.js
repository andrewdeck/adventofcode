const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input.txt', 'utf8');


// unitTestPartOne();
partOne();
// unitTestPartTwo();
// partTwo();



function partOne() {
  let rows = [];

  function getInput() {
    return null;
  }

  let instruction = [];
  function receiveInstruction(inst) {
    instruction.push(inst);
    if(instruction.length === 3) {
      let [x, y, tileId] = instruction;
      // console.log(x, y, tileId);
      if(!rows[y]) rows[y] = [];
      rows[y][x] = tileId;
      
      instruction = [];
    }
  }

  intcodeComputer(file, getInput, receiveInstruction);

  let blockCount = 0;
  rows.forEach(row => {
    console.log(row.map(t => t===0?' ':t).join(''));
    let blocks = row.reduce((count, tile) => {
      if(tile === 2) count++;
      return count;
    }, 0);
    blockCount += blocks;
  });
  console.log(blockCount);
}

function partTwo() {
}

function unitTestPartOne() {
  
}

function unitTestPartTwo() {

}

function intcodeComputer(program, getInput, writeOutput) {
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
    let opcode = Number(instruction.slice(-2));

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
      program[dest] = getInput();
      cur += 2;
    } else if (opcode === 4) { // ouptut to input
      let output = getParam(1, instruction);
      // console.log('output: ' + output);
      writeOutput(output);
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
}