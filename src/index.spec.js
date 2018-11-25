const assert = require('assert');
const commandProcessor = require('./output/commandProcessor');

describe('RobotTest', () => {
	let controls;

	beforeEach(() => {
		const robotInstance = require('./robot/')([
			['a1', 'a2', 'a3', 'a4', 'a5'],
			['b1', 'b2', 'b3', 'b4', 'b5'],
			['c1', 'c2', 'c3', 'c4', 'c5'],
			['d1', 'd2', 'd3', 'd4', 'd5'],
			['e1', 'e2', 'e3', 'e4', 'e5']
		]);
		controls = robotInstance.controls;
	});

	afterEach(() => {
		controls = {};
	});

	describe('Test Setup', () => {
		it('Robot initialises with default values', () => {
			assert.equal(controls.robot.getFacing(), undefined);
			assert.equal(controls.robot.getPosition().x, undefined);
			assert.equal(controls.robot.getPosition().y, undefined);
			assert.equal(controls.robot.room.getFloorPlan()[1][1], 'd2');
			assert.equal(controls.robot.room.getFloorPlan()[2][3], 'c4');
			assert.equal(controls.robot.room.getFloorPlan()[4][4], 'a5');
		});
	});

	describe('Robot is controllable', () => {
		it('Robot can turn LEFT in 90 degree increments, 450 degrees', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			assert.equal(controls.robot.getFacing(), 'WEST');

			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			assert.equal(controls.robot.getFacing(), 'SOUTH');

			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			assert.equal(controls.robot.getFacing(), 'EAST');

			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			assert.equal(controls.robot.getFacing(), 'NORTH');

			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			assert.equal(controls.robot.getFacing(), 'WEST');
		});

		it('Robot can turn RIGHT in 90 degree increments, 450 degrees', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['RIGHT'])[0]);
			assert.equal(controls.robot.getFacing(), 'EAST');

			controls.doInstruction(commandProcessor(['RIGHT'])[0]);
			assert.equal(controls.robot.getFacing(), 'SOUTH');

			controls.doInstruction(commandProcessor(['RIGHT'])[0]);
			assert.equal(controls.robot.getFacing(), 'WEST');

			controls.doInstruction(commandProcessor(['RIGHT'])[0]);
			assert.equal(controls.robot.getFacing(), 'NORTH');

			controls.doInstruction(commandProcessor(['RIGHT'])[0]);
			assert.equal(controls.robot.getFacing(), 'EAST');
		});

		it('Robot can\'t be placed in an illegal position', () => {
			controls.doInstruction(commandProcessor(['PLACE 6,8,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.robot.getPosition().x, undefined);
			assert.equal(controls.robot.getPosition().y, undefined);
		});

		it('Robot won\'t move before a PLACE command is called', () => {
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			controls.doInstruction(commandProcessor(['RIGHT'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.robot.getPosition().x, undefined);
			assert.equal(controls.robot.getPosition().y, undefined);
			assert.equal(controls.robot.getFacing(), 'NORTH');

			controls.doInstruction(commandProcessor(['PLACE 0,0,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.robot.getPosition().x, 0);
			assert.equal(controls.robot.getPosition().y, 1);
			assert.equal(controls.robot.getFacing(), 'NORTH');
		});
	});

	describe('Robot Tests', () => {
		it('Robot test 1', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '0,1,NORTH');
		});

		it('Robot test 2', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['LEFT'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '0,0,WEST');
		});

		it('Robot test 3', () => {
			controls.doInstruction(commandProcessor(['PLACE 1,2,EAST'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '3,3,NORTH');
		});

		it('Robot test 4', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,NORTH'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '0,4,NORTH');
		});

		it('Robot test 5', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,WEST'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '0,0,WEST');
		});

		it('Robot test 6', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,EAST'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '4,0,EAST');
		});

		it('Robot test 7', () => {
			controls.doInstruction(commandProcessor(['PLACE 0,0,SOUTH'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['LEFT'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);
			controls.doInstruction(commandProcessor(['MOVE'])[0]);

			assert.equal(controls.doInstruction(commandProcessor(['REPORT'])[0]), '2,0,EAST');
		});
	});
});
