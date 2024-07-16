"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorSystem = void 0;
const Queue_1 = require("../Common/Queue");
const Direction_1 = require("../Elevator/Direction");
class ElevatorSystem {
    constructor(elevatorsCount, floorsCount) {
        this.elevators = [];
        this.elevatorsCount = 0;
        this.floorsCount = 0;
        this.elevatorsCount = elevatorsCount;
        this.floorsCount = floorsCount;
        this.initElevators();
    }
    initElevators() {
        if (this.elevatorsCount <= 16) {
            for (const elevatorNumber of Array(this.elevatorsCount).keys()) {
                const id = (elevatorNumber + 1).toString();
                const singleElevator = {
                    id,
                    floor: 0,
                    direction: Direction_1.Direction.IDLE,
                    callsQueue: new Queue_1.Queue(),
                };
                this.elevators.push(singleElevator);
            }
        }
        else {
            throw new Error('Maximum number of elevators is 16');
        }
    }
    step() {
        this.elevators = this.elevators.map((elevator) => {
            const call = elevator.callsQueue.dequeue();
            if (call) {
                const isLastCall = elevator.callsQueue.getValues().length === 0;
                const direction = elevator.floor === call.targetFloor || isLastCall ? Direction_1.Direction.IDLE : call.direction;
                return Object.assign(Object.assign({}, elevator), { floor: call.targetFloor, direction });
            }
            return Object.assign(Object.assign({}, elevator), { direction: Direction_1.Direction.IDLE });
        });
    }
    findClosestElevatorTravellingInSameDirection(call) {
        let isAnyFound = false;
        let closestElevator = this.elevators[0];
        let minDiff = this.floorsCount;
        this.elevators.forEach((elevator) => {
            const floorDiff = Math.abs(elevator.floor - call.targetFloor);
            const isOnTheWayUp = call.direction === Direction_1.Direction.UP && call.targetFloor > elevator.floor;
            const isOnTheWayDown = call.direction === Direction_1.Direction.DOWN && call.targetFloor < elevator.floor;
            if ((elevator.direction === call.direction && (isOnTheWayUp || isOnTheWayDown) && floorDiff < minDiff) ||
                (elevator.direction === Direction_1.Direction.IDLE && floorDiff < minDiff)) {
                minDiff = floorDiff;
                closestElevator = elevator;
                isAnyFound = true;
            }
        });
        if (isAnyFound) {
            return closestElevator;
        }
        else {
            return undefined;
        }
    }
    findAnyClosestElevator(call) {
        let closest = this.elevators[0];
        let minDiff = this.floorsCount;
        this.elevators.forEach((elevator) => {
            const floorDiff = Math.abs(elevator.floor - call.targetFloor);
            if (floorDiff < minDiff) {
                minDiff = floorDiff;
                closest = elevator;
            }
        });
        return closest;
    }
    findElevatorOnSameLevel(call) {
        return this.elevators.find((elevator) => elevator.floor === call.targetFloor);
    }
    callFromHallway(targetFloor, direction) {
        const call = { targetFloor, direction };
        if ([0, 1, 2].includes(direction) && targetFloor <= this.floorsCount) {
            const closestElevator = this.findElevatorOnSameLevel(call) ||
                this.findClosestElevatorTravellingInSameDirection(call) ||
                this.findAnyClosestElevator(call);
            closestElevator.callsQueue.enqueue({ targetFloor: call.targetFloor, direction: call.direction });
        }
        else {
            throw new Error('Incorrect call');
        }
    }
    callFromElevator(elevatorId, targetFloor) {
        const call = { elevatorId, targetFloor };
        if (targetFloor <= this.floorsCount) {
            this.elevators.forEach((elevator) => {
                var _a;
                if (elevator.id === call.elevatorId) {
                    const direction = call.targetFloor < (((_a = elevator.callsQueue.peek()) === null || _a === void 0 ? void 0 : _a.targetFloor) || elevator.floor) ? Direction_1.Direction.DOWN : Direction_1.Direction.UP;
                    return elevator.callsQueue.enqueue({ targetFloor: call.targetFloor, direction });
                }
            });
        }
        else {
            throw new Error('Incorrect call');
        }
    }
    state() {
        return { floorsCount: this.floorsCount, elevators: this.elevators };
    }
}
exports.ElevatorSystem = ElevatorSystem;
