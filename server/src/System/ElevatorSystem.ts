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

    state(): { floorsCount: number; elevators: Elevator[] } {
        return { floorsCount: this.floorsCount, elevators: this.elevators };
    }

    step() {
        this.elevators = this.elevators.map((elevator) => {
            const call = elevator.callsQueue.dequeue();
            if (call) {
                return { ...elevator, floor: call.targetFloor, direction: elevator.callsQueue.peek()?.direction || call.direction };
            }
            return { ...elevator, direction: Direction.IDLE };
        });
    }

    callFromHallway(targetFloor: number, direction: Direction): string {
        const call: Call = { targetFloor, direction };

        if ([0, 1, 2].includes(direction) && targetFloor <= this.floorsCount) {
            const closestElevator =
                this.findElevatorOnSameLevel(call) ||
                this.findFirstElevatorTravellingInSameDirection(call) ||
                this.findAnyClosestElevator(call);

            if (this.findElevatorOnSameLevel(call)) {
                return closestElevator.id;
            } else {
                closestElevator.callsQueue.enqueue({ targetFloor: call.targetFloor, direction: call.direction });
                return closestElevator.id;
            }
        } else {
            throw new Error('Incorrect call');
        }
    }

    private findElevatorOnSameLevel(call: Call): Elevator | undefined {
        return this.elevators.find((elevator) => elevator.floor === call.targetFloor);
    }

    private findFirstElevatorTravellingInSameDirection(call: Call): Elevator | undefined {
        let isAnyFound = false;

        let closestElevator: Elevator = this.elevators[0];

        this.elevators.forEach((elevator) => {
            const isOnTheWayUp = call.direction === Direction.UP && call.targetFloor > elevator.floor;
            const isOnTheWayDown = call.direction === Direction.DOWN && call.targetFloor < elevator.floor;

            if (elevator.direction === call.direction && (isOnTheWayUp || isOnTheWayDown)) {
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

    callFromElevator(elevatorId: string, targetFloor: number): void {
        const call: CallFromElevator = { elevatorId, targetFloor };

        if (targetFloor <= this.floorsCount) {
            this.elevators = this.elevators.map((elevator) => {
                if (elevator.id === call.elevatorId) {
                    const direction = this.getDirection(elevator, targetFloor);
                    const newQueue = this.insertCallInQueue(elevator, { targetFloor, direction });

                    return { ...elevator, direction, callsQueue: newQueue } as Elevator;
                }
                return elevator;
            });
        } else {
            throw new Error('Incorrect call');
        }
    }

    private getDirection(elevator: Elevator, targetFloor: number): Direction {
        const currentFloor = elevator.floor;
        let direction = elevator.direction;

        if (direction === Direction.IDLE) {
            direction = targetFloor > currentFloor ? Direction.UP : Direction.DOWN;
        }

        return direction;
    }

    private insertCallInQueue(elevator: Elevator, newCall: Call): Queue<Call> {
        const newQueue = new Queue<Call>();
        let inserted = false;

        // Iterate through the existing queue and insert the new call in the correct position
        while (!elevator.callsQueue.isEmpty()) {
            const currentCall = elevator.callsQueue.dequeue()!;
            if (
                !inserted &&
                ((newCall.direction === Direction.UP && currentCall.targetFloor > newCall.targetFloor) ||
                    (newCall.direction === Direction.DOWN && currentCall.targetFloor < newCall.targetFloor))
            ) {
                newQueue.enqueue(newCall);
                inserted = true;
            }
            newQueue.enqueue(currentCall);
        }

        if (!inserted) {
            newQueue.enqueue(newCall);
        }

        return newQueue;
    }
}
