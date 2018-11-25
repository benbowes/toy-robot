const error = require('../error');
const Room = require('./Room.js');
const Robot = require('./Robot.js');
const Controls = require('./Controls.js');

/**
 * @param floorPlan - Array<string[]>
 */
module.exports = (floorPlan) => {
	if (floorPlan === undefined) {
		return error('No floor plan supplied');
	}

	const room = new Room(floorPlan);
	const robot = new Robot(room);
	const controls = new Controls(robot);

	return {
		room,
		robot,
		controls
	}
}
