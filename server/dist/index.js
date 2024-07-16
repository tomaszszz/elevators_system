"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ElevatorSystem_1 = require("./System/ElevatorSystem");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
let elevatorSystem;
const elevatorsCount = process.env.ELEVATORS_COUNT;
const floorsCount = process.env.FLOORS;
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/step', (req, res) => {
    res.send(elevatorSystem.step());
});
app.get('/state', (req, res) => {
    res.send(elevatorSystem.state());
});
app.post('/callFromElevator', (req, res) => {
    const elevatorId = req.body.elevatorId;
    const targetFloor = req.body.targetFloor;
    res.send(elevatorSystem.callFromElevator(elevatorId, +targetFloor));
});
app.post('/callFromHallway', (req, res) => {
    const floor = req.body.floor;
    const direction = req.body.direction;
    res.send(elevatorSystem.callFromHallway(+floor, +direction));
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    initElevatorSystem();
});
function initElevatorSystem() {
    try {
        elevatorSystem = new ElevatorSystem_1.ElevatorSystem(elevatorsCount ? +elevatorsCount : 4, floorsCount ? +floorsCount : 10);
        console.log(`\nElevator system initialized successfully, elevators count = ${elevatorsCount}`);
    }
    catch (error) {
        console.error(`Error occured during initialization`);
    }
}
