const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input', 'utf8');

// unitOne();
// partOne();

partTwo();

function partOne() {
  console.log(calculateOreRequirement(file, 1));
}

function partTwo() {
  let cargo = 1000000000000;
  let max = cargo, min = 0;
  while(Math.abs(max - min) > 2) {
    console.log(`min: ${min} max: ${max}`);
    let guess = Math.round((max + min) / 2);
    let fuel = calculateOreRequirement(file, guess);
    if( fuel > cargo) max = guess;
    if( fuel < cargo) min = guess;
  }
  console.log(min);
}

function calculateOreRequirement(data, amount) {
  let reactions = parseData(data);

  let surplus = {};

  function oreCost(ingredient, quantity) {
    // console.log(`oreCost: ${ingredient} ${quantity}`);
    if(ingredient === 'ORE') return quantity;

    let {inputs, count} = reactions[ingredient];
    let extra = surplus[ingredient] || 0;
    let needed = quantity - extra;
    let multiple = Math.ceil(needed/count);
    surplus[ingredient] = (count * multiple) - needed;
    return inputs.reduce((sum, input) => {
      return sum + oreCost(input.name, input.count * multiple);
    }, 0);
  }

  return oreCost('FUEL', amount);
}

function parseData(data) {
  let reactions = {};

  data.split('\n').forEach(line => {
    let reaction = {
      count: 0,
      inputs: []
    };
    let [inputs, product] = line.split('=>');
    let [pCount, pName] = product.trim().split(' ');
    reaction.count = Number(pCount);
    inputs.split(',').forEach(input => {
      let [iCount, iName] = input.trim().split(' ');
      reaction.inputs.push({
        name: iName,
        count: Number(iCount)
      });
    });

    reactions[pName] = reaction;
  });
  // console.log(JSON.stringify(reactions));
  return reactions;
}


function unitOne() {
  let data = `9 ORE => 2 A
  8 ORE => 3 B
  7 ORE => 5 C
  3 A, 4 B => 1 AB
  5 B, 7 C => 1 BC
  4 C, 1 A => 1 CA
  2 AB, 3 BC, 4 CA => 1 FUEL`;

  assert.equal(calculateOreRequirement(data), 165);

  data = `157 ORE => 5 NZVS
  165 ORE => 6 DCFZ
  44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
  12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
  179 ORE => 7 PSHF
  177 ORE => 5 HKGWZ
  7 DCFZ, 7 PSHF => 2 XJWVT
  165 ORE => 2 GPVTF
  3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

  assert.equal(calculateOreRequirement(data), 13312);
}