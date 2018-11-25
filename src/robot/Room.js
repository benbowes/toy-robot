const error = require('../error');

class Room {

	constructor(floorPlan) {
		if (floorPlan === undefined) {
			return error('No floor plan supplied');
		}

		this.floorPlan = floorPlan.reverse(); // Flip it so increment++ north;
		return this;
	}

	getFloorPlan() {
		return this.floorPlan; // return the whole floor plan array
	}

	getTileValue(x, y) {
		try {
			return this.floorPlan[x][y];
		} catch (err) {
			return false;
		}
	}

	getNorthOffset(x, y) {
		return {
			x: x,
			y: y + 1
		};
	}

	getEastOffset(x, y) {
		return {
			x: x + 1,
			y: y
		};
	}

	getSouthOffset(x, y) {
		return {
			x: x,
			y: y - 1
		};
	}

	getWestOffset(x, y) {
		return {
			x: x - 1,
			y: y
		};
	}

}

module.exports = Room;
