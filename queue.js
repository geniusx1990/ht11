class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.items.shift();
        } else {
            throw new Error("dequeue from empty queue");
        }
    }

    top() {
        if (!this.isEmpty()) {
            return this.items[0];
        } else {
            return undefined;
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

const myQueue = new Queue();
myQueue.enqueue(1);
myQueue.enqueue(2);
console.log(myQueue.top()); 
console.log(myQueue.dequeue());
console.log(myQueue.dequeue()); 
console.log(myQueue.isEmpty()); 
