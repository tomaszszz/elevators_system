import { Direction } from '../Elevator/Direction';
import { Elevator } from '../Elevator/Elevator';

export interface ElevatorSystemOperations {
    callFromHallway(targetFloor: number, direction: Direction): void;
    callFromElevator(elevatorId: string, targetFloor: number): void;
    state(): { floorsCount: number; elevators: Elevator[] };
    step(): void;
}
