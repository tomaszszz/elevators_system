export class Queue<T> {
    private values: T[] = [];
    private capacity: number;

    constructor(capacity: number = Infinity) {
        this.capacity = capacity;
    }

    enqueue(item: T) {
        if (this.isFull()) {
            throw new Error(`Queue is full, capacity: ${this.capacity}`);
        } else {
            this.values.push(item);
        }
    }

    dequeue() {
        return this.values.shift();
    }

    peek(): T {
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
