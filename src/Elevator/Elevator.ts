import { Direction } from './Direction';

export interface Elevator {
    id: string;
    floor: number;
    targetFloor: number;
    direction: Direction;
}
