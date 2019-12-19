const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input', 'utf8');

// partOne();
partTwo();

function partOne() {
  let grid = [];
  let pos = {};
  let inputs = [];
  function getInput() {
    let input = inputs.shift();
    // console.log(`input: ${input}`);
    return input;
  }

  function setMotion(motion) {
    // console.log(`motion: ${motion}`);
    if(!grid[pos.y]) grid[pos.y] = [];
    grid[pos.y][pos.x] = motion;
  }

  function printGrid() {
    grid.forEach((row, y)=> {
      let display = row.map(pos => pos === 0 ? '.' : '#');
      console.log(y, display.join(''));
    });
  }

  for(let y = 0; y<50; y++) {
    for(let x = 0; x < 50; x++) {
      pos = {x,y};
      inputs = [x,y];
      intcodeComputer(file, getInput, setMotion);
    }
  }
  printGrid();

  let count = 0;
  for(let y = 0; y<50; y++) {
    for(let x = 0; x < 50; x++) {
      count += grid[y][x];
    }
  }
  console.log(count);
}

function partTwo() {
  //manually doing these to reduce each run time
  const SEARCH_MAX = 1500;
  const SEARCH_MIN = 500;
  let grid = [];
  let pos = {};
  let inputs = [];
  function getInput() {
    let input = inputs.shift();
    return input;
  }

  function setMotion(motion) {
    if(!grid[pos.y]) grid[pos.y] = [];
    grid[pos.y][pos.x] = motion;
  }

  function printGrid() {
    for(let y = SEARCH_MIN; y<SEARCH_MAX; y++) {
      let row = [];
      for(let x = SEARCH_MIN; x < SEARCH_MAX; x++) {
        row.push(grid[y][x] === 0 ? '.' : '#');
      }
      console.log(row.join(''));
    }
  }

  for(let y = SEARCH_MIN; y<SEARCH_MAX; y++) {
    for(let x = SEARCH_MIN; x < SEARCH_MAX; x++) {
      pos = {x,y};
      inputs = [x,y];
      intcodeComputer(file, getInput, setMotion);
    }
    console.log(y);
  }

  let closest = {x: SEARCH_MAX, y: SEARCH_MAX};
  for(let y = SEARCH_MIN+99; y<SEARCH_MAX; y++) {
    for(let x = SEARCH_MIN; x < SEARCH_MAX; x++) {
      if(grid[y][x] === 1) {
        if(grid[y-99][x+99] === 1) {
          let corner = {x: x, y: y-99};
          if(corner.x < closest.x || corner.y < closest.y) {
            closest = corner;
          }
        }
      }
    }
  }
  console.log(closest);
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