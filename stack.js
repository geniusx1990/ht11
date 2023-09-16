class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (!this.isEmpty()) {
            return this.items.pop();
        } else {
            throw new Error("pop from empty stack");
        }
    }

    peek() {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
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


class MinMaxStack extends Stack {
    constructor() {
        super();
        this.minStack = new Stack();
        this.maxStack = new Stack();
    }

    push(value) {
        super.push(value);

        if (this.minStack.isEmpty() || value <= this.minStack.peek()) {
            this.minStack.push(value);
        }

        if (this.maxStack.isEmpty() || value >= this.maxStack.peek()) {
            this.maxStack.push(value);
        }
    }

    pop() {
        if (!this.isEmpty()) {
            const poppedValue = super.pop();

            if (poppedValue === this.minStack.peek()) {
                this.minStack.pop();
            }

            if (poppedValue === this.maxStack.peek()) {
                this.maxStack.pop();
            }

            return poppedValue;
        } else {
            throw new Error("pop from empty MinMaxStack");
        }
    }

    getMin() {
        if (!this.minStack.isEmpty()) {
            return this.minStack.peek();
        } else {
            return undefined;
        }
    }

    getMax() {
        if (!this.maxStack.isEmpty()) {
            return this.maxStack.peek();
        } else {
            return undefined;
        }
    }
}

const stack = new MinMaxStack();


stack.push(5);
stack.push(2);
stack.push(7);
stack.push(1);

console.log("Minimum:", stack.getMin()); // Output: 1
console.log("Maximum:", stack.getMax()); // Output: 7

stack.pop();
console.log("Minimum after pop:", stack.getMin()); // Output: 2
console.log("Maximum after pop:", stack.getMax()); // Output: 7
