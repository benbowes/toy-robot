const error = require('../error');

class Controls {

	constructor(robot) {
		if (robot === undefined) {
			return error('Controls" Class must be initialized with a "robot"');
		}
		this.robot = robot;
		return this;
	}

	doInstruction(instruction) {
		const instructionFunction = instruction['instruction'];
		return this[instructionFunction](instruction);
	}

	PLACE({ X, Y, F }) {
		const x = X;
		const y = Y;
		const facing = F;
		this.robot.setFacing(facing);
		this.robot.setPosition(x, y);
	}

	MOVE() {
		this.robot.move();
	}

	LEFT() {
		this.robot.rotate('LEFT');
	}

	RIGHT() {
		this.robot.rotate('RIGHT');
	}

	REPORT() {
		const pos = this.robot.getPosition();
		const facing = this.robot.getFacing();

		if (!pos || !facing) {
			return error('Missing valid PLACE command');
		}

		return `${pos.x},${pos.y},${facing}`;
	}

}

module.exports = Controls;
