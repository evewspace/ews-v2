'use strict';

const fs = require('fs')
  , path = require('path')
  , expect = require('chai').expect;

require('mocha-generators').install();

const frontDir = path.join(__dirname, 'frontend');
const backDir = path.join(__dirname, 'backend');

function testFilter(name) {
  return /\.js$/i.test(path.extname(name));
}

const FrontendTests = fs.readdirSync(frontDir).filter(testFilter);
const BackendTests = fs.readdirSync(backDir).filter(testFilter);

FrontendTests.forEach(function(file) {
  require(path.join(frontDir, file));
});

BackendTests.forEach(function(file) {
  require(path.join(backDir, file));
});
