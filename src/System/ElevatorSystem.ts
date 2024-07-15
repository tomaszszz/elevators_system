import e from 'express';
import { Elevator } from '../Elevator/Elevator';
import { ElevatorSystemOperations } from './ElevatorSystemOperations';
import { Queue } from '../Common/Queue';
import { Direction } from '../Elevator/Direction';
import { Call } from '../Common/CallDisposition';

export interface ClosestElevatorData {
    id: string;
    direction: Direction;
}

export class ElevatorSystem implements ElevatorSystemOperations {
    private elevators: Elevator[] = [];

    private callsQueue: Queue<Call> = new Queue();

    private elevatorsCount: number = 0;
    private floorsCount: number = 0;

    constructor(elevatorsCount: number, floorsCount: number) {
        this.elevatorsCount = elevatorsCount;
        this.floorsCount = floorsCount;
        this.initElevators();
    }

    private initElevators(): void {
        if (this.elevatorsCount <= 16) {
            for (const elevatorNumber of Array(this.elevatorsCount).keys()) {
                const id = (elevatorNumber + 1).toString();
                const singleElevator = {
                    id,
                    floor: 0,
                    targetFloor: 0,
                    direction: Direction.IDLE,
                };
                this.elevators.push(singleElevator);
            }
        } else {
            throw new Error('Maximum number of elevators is 16');
        }
    }

    // TODO: separate queues for each elevator

    step() {
        // for (const call of this.callsQueue) {
        const call = this.callsQueue.dequeue();
        if (call) {
            const closestElevator = this.findClosestElevatorTravellingInSameDirection(call) || this.findAnyClosestElevator(call);
            // console.log('CLOSEST ELEVATOR: \n', closestElevator);

            this.update(closestElevator.id, call.targetFloor, call.direction);
            // console.log(this.state());
        } else {
            throw new Error('Calls queue is empty');
        }
        // }
    }

    private findClosestElevatorTravellingInSameDirection(call: Call): Elevator | undefined {
        let isAnyFound = false;

        let closestElevator: Elevator = this.elevators[0];
        let minDiff: number = this.floorsCount;

        this.elevators.forEach((elevator) => {
            const floorDiff = Math.abs(elevator.floor - call.targetFloor);
            const isOnTheWayUp = call.direction === Direction.UP && call.targetFloor > elevator.floor;
            const isOnTheWayDown = call.direction === Direction.DOWN && call.targetFloor < elevator.floor;

            if (elevator.direction === call.direction && (isOnTheWayUp || isOnTheWayDown) && floorDiff < minDiff) {
                minDiff = floorDiff;
                closestElevator = elevator;
            }
            console.log('CLOSEST ON THE WAY:', floorDiff, minDiff);
        });

        if (isAnyFound) {
            return closestElevator;
        } else {
            return undefined;
        }
    }

    private findAnyClosestElevator(call: Call): Elevator {
        let closest: Elevator = this.elevators[0];
        let minDiff: number = this.floorsCount;

        this.elevators.forEach((elevator) => {
            const floorDiff = Math.abs(elevator.floor - call.targetFloor);
            if (floorDiff < minDiff) {
                minDiff = floorDiff;
                closest = elevator;
            }
            console.log('CLOSEST: ', floorDiff, minDiff);
        });

        return closest;
    }

    call(targetFloor: number, direction: Direction): void {
        const call: Call = { targetFloor, direction };
        if ((direction <= 2 || direction >= 0) && targetFloor < this.floorsCount) {
            this.callsQueue.enqueue(call);
        } else {
            throw new Error('Incorrect call');
        }
    }

    update(elevatorId: string, targetFloor: number, direction: Direction): void {
        this.elevators = this.elevators.map((elevator) => {
            if (elevator.id === elevatorId) {
                if (elevator.targetFloor) {
                    elevator.floor = elevator.targetFloor;
                }
                return { ...elevator, targetFloor, direction };
            }
            return elevator;
        });
    }

    moveElevator(elevatorId: string, floor: number): void {
        this.elevators = this.elevators.map((elevator) => {
            if (elevator.id === elevatorId) {
                return { ...elevator, floor };
            }
            return elevator;
        });
    }

    state(): Elevator[] {
        return this.elevators;
    }
}
