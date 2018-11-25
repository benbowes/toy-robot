const chalk = require('chalk');

module.exports = () => {
  const heading = chalk.cyan.bgBlack.bold(`
             
  TOY ROBOT  
             
`);

  const help = chalk.black.bgWhite(`

  ${chalk.bold('PLACE X,Y,F')}  - places the robot
    ${chalk.bold('X')} = X axis position
    ${chalk.bold('Y')} = Y axis position
    ${chalk.bold('F')} = Facing direction, either EAST,WEST,NORTH,SOUTH

  ${chalk.bold('RIGHT')}    - rotates the robot 90º clockwise
  ${chalk.bold('LEFT')}     - rotates the robot 90º anti-clockwise
  ${chalk.bold('MOVE')}     - moves the robot one position forward in it's facing direction
  ${chalk.bold('REPORT')}   - exits the program and reports the position of the robot

  e.g.

  ? Command.... PLACE 1,2,EAST
  ? Command.... MOVE
  ? Command.... MOVE
  ? Command.... LEFT
  ? Command.... MOVE
  ? Command.... REPORT

  // => Position: 3,3,NORTH
`);

  const prompt = `

Please enter your Commands... exit by entering 'REPORT'
`;

  console.log(`${heading}${help}${prompt}`);
};