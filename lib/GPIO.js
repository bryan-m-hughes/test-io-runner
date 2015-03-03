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

var utils = require('./utils.js');

var io = utils.io;
var config = utils.config;
var pins = config.tests.GPIO;
var testCases = {};

Object.keys(pins).map(function (pin) {
  var normalizedPin = pins[pin].normalizedPin;
  var pinInstance = io.pins[normalizedPin];
  testCases[pin] = {
    'Has the correct pin instance information': {
      'The normalized pin is correct': function(test) {
        test.equal(normalizedPin, io.normalize(pin));
        test.done();
      }
    },
    'Has the correct supported modes': function(test) {
      test.equal(typeof pinInstance, 'object');
      test.ok(Array.isArray(pinInstance.supportedModes));
      test.notEqual(pinInstance.supportedModes.indexOf(io.MODES.INPUT), -1);
      test.notEqual(pinInstance.supportedModes.indexOf(io.MODES.OUTPUT), -1);
      test.done();
    },
    'Has a value property that is a number': function(test) {
      test.equal(typeof pinInstance.value, 'number');
      test.equal(typeof pinInstance.report, 'number');
      test.done();
    },
    'Has the correct analog channel': function(test) {
      test.equal(pinInstance.analogChannel, pins[pin].analogChannel);
      test.done();
    }/*,
    'Can write high': function(test) {
      io.pinMode(normalizedPin, io.MODES.OUTPUT);
      io.digitalWrite(normalizedPin, io.HIGH);
      utils.invokeRemote('gpio,w', function(response) {
        test.equals(io.pins[normalizedPin].mode, io.MODES.OUTPUT);
        test.equals(io.pins[normalizedPin].value, io.HIGH);
        test.equals(response, 'high');
        test.done();
      });
    },
    'Can write low': function(test) {
      io.pinMode(normalizedPin, io.MODES.OUTPUT);
      io.digitalWrite(normalizedPin, io.LOW);
      utils.invokeRemote('gpio,w', function(response) {
        test.equals(io.pins[normalizedPin].mode, io.MODES.OUTPUT);
        test.equals(io.pins[normalizedPin].value, io.LOW);
        test.equals(response, 'low');
        test.done();
      });
    },
    'Can read high': function(test) {
      io.pinMode(normalizedPin, io.MODES.INPUT);
      utils.invokeRemote('gpio,r,high', function() {
        test.equals(io.pins[normalizedPin].mode, io.MODES.INPUT);
        test.equals(io.pins[normalizedPin].value, io.HIGH);
        test.done();
      });
    },
    'Can read low': function(test) {
      io.pinMode(normalizedPin, io.MODES.INPUT);
      utils.invokeRemote('gpio,r,low', function() {
        test.equals(io.pins[normalizedPin].mode, io.MODES.INPUT);
        test.equals(io.pins[normalizedPin].value, io.LOW);
        test.done();
      });
    }*/
  };
});

exports.GPIO = testCases;
