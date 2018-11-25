const { prompt } = require('inquirer');
const introText = require('./introText');
const commandProcessor = require('../output/commandProcessor');
const printResult = require('../output/printResult');
/**
 * Setup Robot by passing in a tilemap to use as the floorplan - Array<string[]>
 */
const robot = require('../robot/')([
  ['a1', 'a2', 'a3', 'a4', 'a5'],
  ['b1', 'b2', 'b3', 'b4', 'b5'],
  ['c1', 'c2', 'c3', 'c4', 'c5'],
  ['d1', 'd2', 'd3', 'd4', 'd5'],
  ['e1', 'e2', 'e3', 'e4', 'e5']
]);

// Accumulator of commands
let commands = [];

// Print into text
introText();

// Init - start asking for instructions...
function requestInput() {
  prompt([{ type: 'input', name: 'command', message: 'Command....' }])
    .then(answer => {
      commands = [...commands, answer.command];

      if (answer.command === 'REPORT') {
        let result;
        commandProcessor(commands).forEach(comand => {
          result = robot.controls.doInstruction(comand);
        });

        printResult(result);
      } else {
        requestInput();
      }
    });
}

requestInput();

module.exports = robot;