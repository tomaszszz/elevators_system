import { Direction } from '../Elevator/Direction';
import { Elevator } from '../Elevator/Elevator';

export interface ElevatorSystemOperations {
    call(targetFloor: number, direction: Direction): void;
    update(elevatorId: string, targetFloor: number, direction: Direction): void;
    moveElevator(elevatorId: string, floor: number): void;
    state(): Elevator[];
    step(): void;
}
