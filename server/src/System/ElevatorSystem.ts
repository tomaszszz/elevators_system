import { Elevator } from '../Elevator/Elevator';
import { ElevatorSystemOperations } from './ElevatorSystemOperations';
import { Queue } from '../Common/Queue';
import { Direction } from '../Elevator/Direction';
import { Call, CallFromElevator } from '../Common/CallDisposition';

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

    step() {
        this.elevators = this.elevators.map((elevator) => {
            const call = elevator.callsQueue.dequeue();
            if (call) {
                const isLastCall = elevator.callsQueue.getValues().length === 0;
                const direction = elevator.floor === call.targetFloor || isLastCall ? Direction.IDLE : call.direction;
                return { ...elevator, floor: call.targetFloor, direction };
            }
            return { ...elevator, direction: Direction.IDLE };
        });
    }

    private findClosestElevatorTravellingInSameDirection(call: Call): Elevator | undefined {
        let isAnyFound = false;

        let closestElevator: Elevator = this.elevators[0];
        let minDiff: number = this.floorsCount;

        this.elevators.forEach((elevator) => {
            const floorDiff = Math.abs(elevator.floor - call.targetFloor);
            const isOnTheWayUp = call.direction === Direction.UP && call.targetFloor > elevator.floor;
            const isOnTheWayDown = call.direction === Direction.DOWN && call.targetFloor < elevator.floor;

            if (
                (elevator.direction === call.direction && (isOnTheWayUp || isOnTheWayDown) && floorDiff < minDiff) ||
                (elevator.direction === Direction.IDLE && floorDiff < minDiff)
            ) {
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
        });

        return closest;
    }

    private findElevatorOnSameLevel(call: Call): Elevator | undefined {
        return this.elevators.find((elevator) => elevator.floor === call.targetFloor);
    }

    callFromHallway(targetFloor: number, direction: Direction): void {
        const call: Call = { targetFloor, direction };

        if ([0, 1, 2].includes(direction) && targetFloor <= this.floorsCount) {
            const closestElevator =
                this.findElevatorOnSameLevel(call) ||
                this.findClosestElevatorTravellingInSameDirection(call) ||
                this.findAnyClosestElevator(call);

            closestElevator.callsQueue.enqueue({ targetFloor: call.targetFloor, direction: call.direction });
        } else {
            throw new Error('Incorrect call');
        }
    }

    callFromElevator(elevatorId: string, targetFloor: number): void {
        const call: CallFromElevator = { elevatorId, targetFloor };

        if (targetFloor <= this.floorsCount) {
            this.elevators.forEach((elevator) => {
                if (elevator.id === call.elevatorId) {
                    const direction: Direction =
                        call.targetFloor < (elevator.callsQueue.peek()?.targetFloor || elevator.floor) ? Direction.DOWN : Direction.UP;
                    return elevator.callsQueue.enqueue({ targetFloor: call.targetFloor, direction });
                }
            });
        } else {
            throw new Error('Incorrect call');
        }
    }

    state(): { floorsCount: number; elevators: Elevator[] } {
        return { floorsCount: this.floorsCount, elevators: this.elevators };
    }
}
