"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor(capacity = Infinity) {
        this.values = [];
        this.capacity = capacity;
    }
    enqueue(item) {
        if (this.isFull()) {
            throw new Error(`Queue is full, capacity: ${this.capacity}`);
        }
        else {
            this.values.push(item);
        }
    }
    dequeue() {
        return this.values.shift();
    }
    peek() {
        return this.values[0];
    }
    isEmpty() {
        return !this.values.length;
    }
    isFull() {
        return this.values.length > this.capacity;
    }
    getValues() {
        return this.values;
    }
    *[Symbol.iterator]() {
        yield* [...this.values];
    }
}
exports.Queue = Queue;
