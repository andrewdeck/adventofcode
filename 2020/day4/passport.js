const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');

const input = fs.readFileSync('input.txt', 'utf8');

let test = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;


let invalid2 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

let valid2 = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719

iyr:2010 hgt:60in hcl:#123abc ecl:brn byr:1944 eyr:2021 pid:000000001`;

const REQUIRED_FIELDS = [
  'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'
];


function parsePassports(string) {
  let rawPassports = string.split('\n\n');
  
  let structuredPassports = [];

  rawPassports.forEach(raw => {
    let tuples = raw.replace(/\n/g, ' ').split(' ');
    let passport = {};
    tuples.forEach(tuple => {
      let [key, value] = tuple.split(':');
      passport[key] = value;
    });
    structuredPassports.push(passport);
  });

  return structuredPassports;
}

function validPassports(input) {
  let passports = parsePassports(input);
  
  let count = 0;

  passports.forEach(pass => {
    let missing = _.difference(REQUIRED_FIELDS, Object.keys(pass));
    if(missing.length === 0) count++;
  });
  
  return count;
}

function validPassports2(input) {
  let passports = parsePassports(input);
  
  let count = 0;

  passports.forEach(pass => {
    let missing = _.difference(REQUIRED_FIELDS, Object.keys(pass));
    if(missing.length === 0) {
      let validFields = validateFields(pass);
      if(validFields) count++;
    }
  });
  
  return count;
}

function validateFields(passport) {
  let valid = true;
  let {byr, iyr, eyr, hgt, hcl, ecl, pid} = passport;
  
  if(byr.length === 4) {
    byr = Number(byr);
    if(byr < 1920 || byr > 2002) valid = false;
  } else valid = false;

  if(iyr.length === 4) {
    iyr = Number(iyr);
    if(iyr < 2010 || iyr > 2020) valid = false;
  } else valid = false;

  if(eyr.length === 4) {
    eyr = Number(eyr);
    if(eyr < 2020 || eyr > 2030) valid = false;
  } else valid = false;

  if(hgt.endsWith('cm')) {
    hgt = Number(hgt.replace(/cm/, ''));
    if(hgt < 150 || hgt > 193) valid = false;
  } else if(hgt.endsWith('in')) {
    hgt = Number(hgt.replace(/in/, ''));
    if(hgt < 59 || hgt > 76) valid = false;
  } else valid = false;

  if(!hcl.match(/#[0-9a-f]{6}/)) valid = false;

  const validEyeColors = ['amb','blu','brn','gry','grn','hzl','oth'];
  if(!validEyeColors.includes(ecl)) valid = false;

  if(!pid.match(/^\d{9}$/)) valid = false;

  return valid;
}


assert.strictEqual(validPassports(test), 2);
let result = validPassports(input);
console.log('part one', result);

assert.strictEqual(validPassports2(invalid2), 0);
assert.strictEqual(validPassports2(valid2), 5);
result = validPassports2(input);
console.log('part two', result);