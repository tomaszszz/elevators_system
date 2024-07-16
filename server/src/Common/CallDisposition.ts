import { Direction } from '../Elevator/Direction';

export interface Call {
    targetFloor: number;
    direction: Direction;
}

export interface CallFromElevator {
    elevatorId: string;
    targetFloor: number;
}
