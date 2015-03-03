/*
Copyright (c) 2015 Bryan Hughes <bryan@theoreticalideations.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var testCase = require('nodeunit').testCase;
var SerialPort = require('serialport').SerialPort;

var BAUD_RATE = 57600;
var serialPort;

var config;
var io;

Object.defineProperties(exports, {
  config: {
    enumerable: true,
    configurable: true,
    get: function() {
      return config;
    },
    set: function(value) {
      return config = value;
    }
  },
  io: {
    enumerable: true,
    configurable: true,
    get: function() {
      return io;
    },
    set: function(value) {
      return io = value;
    }
  }
});

exports.initSerial = function initSerial(port, cb) {
  serialPort = new SerialPort(port, {
    baudrate: BAUD_RATE
  }, false);
  serialPort.open(cb);
};

exports.invokeRemote = function invokeRemote(data, cb) {
  // TODO: implement me
};
