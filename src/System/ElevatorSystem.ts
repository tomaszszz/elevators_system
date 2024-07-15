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
                    direction: Direction.IDLE,
                    callsQueue: new Queue<Call>(),
                };
                this.elevators.push(singleElevator);
            }
        } else {
            throw new Error('Maximum number of elevators is 16');
        }
    }

    // TODO: separate queues for each elevator

    step() {
        this.update();
    }

    private findClosestElevatorTravellingInSameDirection(call: Call): Elevator | undefined {
        let isAnyFound = false;

        let closestElevator: Elevator = this.elevators[0];
        let minDiff: number = this.floorsCount;

        this.elevators.forEach((elevator) => {
            const floorDiff = Math.abs(elevator.floor - call.targetFloor);
            const isOnTheWayUp = call.direction === Direction.UP && call.targetFloor > elevator.floor;
            const isOnTheWayDown = call.direction === Direction.DOWN && call.targetFloor < elevator.floor;

            console.log('elevatorId: ', elevator.id);
            console.log('isUp: ', isOnTheWayUp);
            console.log('isDown: ', isOnTheWayDown);

            if (
                (elevator.direction === call.direction && (isOnTheWayUp || isOnTheWayDown) && floorDiff < minDiff) ||
                (elevator.direction === Direction.IDLE && floorDiff < minDiff)
            ) {
                console.log('CLOSEST ON THE WAY:', floorDiff, minDiff);
                minDiff = floorDiff;
                closestElevator = elevator;
                isAnyFound = true;
            }
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
        if ([0, 1, 2].includes(direction) && targetFloor < this.floorsCount) {
            const closestElevator = this.findClosestElevatorTravellingInSameDirection(call) || this.findAnyClosestElevator(call);
            closestElevator.callsQueue.enqueue(call);
        } else {
            throw new Error('Incorrect call');
        }
    }

    update(): void {
        this.elevators = this.elevators.map((elevator) => {
            const call = elevator.callsQueue.dequeue();
            if (call) {
                return { ...elevator, floor: call.targetFloor, direction: call.direction };
            }
            return elevator;
        });
    }

    state(): Elevator[] {
        return this.elevators;
    }
}
