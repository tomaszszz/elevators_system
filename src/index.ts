import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ElevatorSystem } from './System/ElevatorSystem';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const elevatorsCount = process.env.ELEVATORS_COUNT;
const floorsCount = process.env.FLOORS;

let elevatorSystem: ElevatorSystem;

app.get('/step', (req: Request, res: Response) => {
    res.send(elevatorSystem.step());
});

app.get('/state', (req: Request, res: Response) => {
    res.send(elevatorSystem.state());
});

app.get('/call', (req: Request, res: Response) => {
    const targetFloor: string = req.query.targetFloor as string;
    const direction: string = req.query.direction as string;

    res.send(elevatorSystem.call(+targetFloor, +direction));
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
        console.error(`Error occured`);
    }
}
