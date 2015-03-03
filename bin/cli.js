#!/usr/bin/env node
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

var fs = require('fs');
var path = require('path');
var program = require('commander');

var DEFAULT_CONFIG_PATH = path.normalize(path.join(__dirname, '..', 'conf', 'conf.json'));

program
  .version(require('../package.json').version)
  .option('-c, --config [file]', 'Configuration file. Defaults to ' + DEFAULT_CONFIG_PATH)
  .parse(process.argv);

// Read the config file
var configPath = program.config || DEFAULT_CONFIG_PATH;
if (!fs.existsSync(configPath)) {
  console.error('No config file found at ' + configPath);
  process.exit(1);
}
var config;
try {
  config = fs.readFileSync(configPath);
} catch(e) {
  console.error('Error reading config file: ' + e);
  process.exit(1);
}
try {
  config = JSON.parse(config.toString());
} catch (e) {
  console.error('Error parsing config file: ' + e);
  process.exit(1);
}
if (typeof config.tests != 'object') {
  console.error('Invalid configuration file: missing "tests" object');
  process.exit(1);
}

require('../lib/runner.js').run(config);