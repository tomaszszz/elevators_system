import { Direction } from '../Elevator/Direction';
import { Elevator } from '../Elevator/Elevator';

export interface ElevatorSystemOperations {
    call(targetFloor: number, direction: Direction): void;
    update(targetFloor: number, direction: Direction): void;
    state(): Elevator[];
    step(): void;
}
