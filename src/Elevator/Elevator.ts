import { Call } from '../Common/CallDisposition';
import { Queue } from '../Common/Queue';
import { Direction } from './Direction';

export interface Elevator {
    id: string;
    floor: number;
    direction: Direction;
    callsQueue: Queue<Call>;
}
