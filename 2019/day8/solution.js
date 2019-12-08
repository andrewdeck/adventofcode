const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('input.txt', 'utf8');

const WIDTH = 25, HEIGHT = 6;

partOne();


function partOne() {
  let data = file.split('').map(x=>Number(x));
  let layers = [];
  let layerSize = WIDTH * HEIGHT;
  for(let i = 0; i < data.length; i += layerSize) {
    let layer = data.slice(i, i + layerSize);
    layers.push(layer);
  }
  let leastZeros = { count: layerSize, index: 0 };
  for(let i = 0; i<layers.length; i++) {
    let zeros = layers[i].filter(x=>x===0).length;
    if(zeros < leastZeros.count) {
      leastZeros = { count: zeros, index: i};
    }
  }
  
  let layer = layers[leastZeros.index];
  let ones = layer.filter(x=>x===1).length;
  let twos = layer.filter(x=>x===2).length;

  console.log(ones*twos);
}

function partTwo() {

}

function unitTestTwo() {
  
}