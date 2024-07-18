import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { ElevatorSystem } from './System/ElevatorSystem';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let elevatorSystem: ElevatorSystem;
const elevatorsCount = process.env.ELEVATORS_COUNT;
const floorsCount = process.env.FLOORS;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/step', (req: Request, res: Response) => {
    res.send(elevatorSystem.step());
});

app.get('/state', (req: Request, res: Response) => {
    res.send(elevatorSystem.state());
});

app.get('/elevatorQueue', (req: Request, res: Response) => {
    const id = req.query.id as string;

    res.send(
        elevatorSystem
            .state()
            .elevators.find((elevator) => elevator.id === id)
            ?.callsQueue.getValues()
    );
});

app.post('/callFromElevator', (req: Request, res: Response) => {
    const elevatorId: string = req.body.elevatorId as string;
    const targetFloor: string = req.body.targetFloor as string;

    res.send(elevatorSystem.callFromElevator(elevatorId, +targetFloor));
});

app.post('/callFromHallway', (req: Request, res: Response) => {
    const floor: string = req.body.floor as string;
    const direction: string = req.body.direction as string;

    res.send({ id: elevatorSystem.callFromHallway(+floor, +direction) });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    initElevatorSystem();
});

function initElevatorSystem(): void {
    try {
        elevatorSystem = new ElevatorSystem(elevatorsCount ? +elevatorsCount : 4, floorsCount ? +floorsCount : 10);

        console.log(`\nElevator system initialized successfully, elevators count = ${elevatorsCount}`);
    } catch (error) {
        console.error(`Error occured during initialization`);
    }
}
