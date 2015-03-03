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

var path = require('path');
var async = require('async');
var reporter = require('nodeunit').reporters.default;
var utils = require('./utils');

exports.run = function(config) {

  // Instantiate the IO plugin
  var io = new (require(config['io-package-name']))(config['io-config']);

  // Store the config and IO instance for use by other modules
  utils.io = io;
  utils.config = config;

  // Initialize plugin and run the tests
  async.parallel([
    function (next) {
      io.on('ready', next);
    },
    function (next) {
      utils.initSerial(config['backpack-serial-port'], next);
    }
  ], function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    reporter.run(Object.keys(config.tests).map(function (test) {
      return path.join(__dirname, test + '.js');
    }), null, function(err) {
      process.exit(err ? 1 : 0);
    });
  });
};
