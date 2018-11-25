module.exports = (commands) => {
  const SINGLE_INSTRUCTION_MATCHER = /^(PLACE|MOVE|LEFT|RIGHT|REPORT)/;
  const PLACE_MATCHER = /^(PLACE) (\d+),(\d+),(EAST|WEST|NORTH|SOUTH)/;

  return commands.reduce((instructions, command) => {
    let result = command.trim().match(SINGLE_INSTRUCTION_MATCHER);
    if (result) {
      if (result[1] === 'PLACE') {
        result = command.trim().match(PLACE_MATCHER);
        // Overwrites any previous instructions
        if (result) {
          instructions = [{
            instruction: result[1],
            X: parseFloat(result[2]),
            Y: parseFloat(result[3]),
            F: result[4]
          }];
        }
      } else {
        // Must be either MOVE|LEFT|RIGHT|REPORT
        instructions.push({ instruction: result[1] });
      }
    }
    return instructions;
  }, []);
};
