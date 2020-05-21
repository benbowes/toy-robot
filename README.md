# Toy Robot (2018)

The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but is prevented from falling to destruction. Any movement that would result in the robot falling from the table is prevented, however further valid movement commands are still allowed.

Commands are in the following form -
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0)
is considered to be the SOUTH WEST most corner.
The first command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application discards all commands in the sequence until a valid PLACE command has been executed.
MOVE will move the toy robot one unit forward in the direction it is currently facing.

LEFT and RIGHT rotate the robot 90 degrees in the specified direction without changing the position of the robot.
REPORT announces the X,Y and F of the robot.

### Pre-requisites
This project runs on NodeJS in a command line. You may need to install NodeJS via your prefered method (via brew, executable etc...) https://nodejs.org/en/

This project was built and tested using NodeJS v8.12.0. Any recent version of NodeJS should work.

### Install the npm dependencies
`cd` into this folder's root folder and run the following command to install all project dependencies

```
npm install
```

### Running Toy Robot
Run this command in your command line at the project's root.
```
npm start
```

You will be presented with a commnd prompt to enter commands.

### Example Input and Output:
```
npm start
? Command.... PLACE 0,0,NORTH
? Command.... MOVE
? Command.... REPORT

Position: 0,1,NORTH
```

```
npm start
? Command.... PLACE 0,0,NORTH
? Command.... LEFT
? Command.... REPORT

Position: 0,0,WEST
```

```
npm start
? Command.... PLACE 1,2,EAST
? Command.... MOVE
? Command.... MOVE
? Command.... LEFT
? Command.... MOVE
? Command.... REPORT

Position: 3,3,NORTH
```

### Running the tests
Run this command in your command line at the project's root.
```
npm test
```
