const error = require('../error');

class Robot {

	constructor(room) {
		if (room === undefined) {
			return error('Robot needs a "room" instance');
		}

		this.room = room;
		this.facing = undefined;
		this.possibleDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
		this.position = {
			x: undefined,
			y: undefined
		};

		return this;
	}

	setPosition(x, y) {
		const pos = this.room.getTileValue(x, y);
		if (pos) {
			this.position = { x, y };
			return this.position;
		} else {
			return false;
		}
	}

	getPosition() {
		return {
			x: this.position.x,
			y: this.position.y
		};
	}

	setFacing(direction) {
		if (this.possibleDirections.indexOf(direction) > -1) {
			this.facing = direction;
		}
		return this.facing;
	}

	getFacing() {
		return this.facing;
	}

	rotate(direction) {
		let directionIndex = this.possibleDirections.indexOf(this.facing);
		switch (direction) {
			case 'LEFT':
				directionIndex--;
				break;
			case 'RIGHT':
				directionIndex++;
				break;
		}

		// ensure currDirIndex value wraps around to stay in bounds of array
		if (directionIndex > this.possibleDirections.length - 1) {
			directionIndex = 0;
		}

		if (directionIndex < 0) {
			directionIndex = this.possibleDirections.length - 1;
		}

		this.setFacing(this.possibleDirections[directionIndex]);
		return this.facing;
	}

	move() {
		let pos;

		if (this.facing === undefined) {
			return error('Robot.move requires Robot.facing to be set');
		}

		// Get the next position of the robot based on which way the robot is facing
		switch (this.facing) {
			case 'NORTH':
				pos = this.room.getNorthOffset(this.position.x, this.position.y);
				break;
			case 'EAST':
				pos = this.room.getEastOffset(this.position.x, this.position.y);
				break;
			case 'SOUTH':
				pos = this.room.getSouthOffset(this.position.x, this.position.y);
				break;
			case 'WEST':
				pos = this.room.getWestOffset(this.position.x, this.position.y);
				break;
		}
		// if the position is valid it will return {x:x, y:y}, or will return false
		return this.setPosition(pos.x, pos.y);
	}
}

module.exports = Robot;
