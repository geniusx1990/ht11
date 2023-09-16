class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    // Insert a new node at the end of the linked list.
    insert(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Delete a node with the given data from the linked list.
    delete(data) {
        if (!this.head) {
            return;
        }

        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        let prev = null;

        while (current !== null && current.data !== data) {
            prev = current;
            current = current.next;
        }

        if (current === null) {
            return; // Node not found
        }

        prev.next = current.next;
    }

    // Detect if the linked list has a cycle using Floyd's Cycle Detection Algorithm.
    hasCycle(head) {
        if (!head || !head.next) {
            return false; // If the list is empty or has only one node, there can't be a cycle
        }

        let slow = head; // Tortoise
        let fast = head; // Hare

        while (fast && fast.next) {
            slow = slow.next; // Move slow by one step
            fast = fast.next.next; // Move fast by two steps

            if (slow === fast) {
                return true; // If they meet, there is a cycle
            }
        }

        return false; // If fast reaches the end, there is no cycle
    }

    // Search for a node with the given data and return it if found, otherwise, return null.
    search(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null; // Node not found
    }

}

// Example usage:
const linkedList = new SinglyLinkedList();

linkedList.insert(1);
linkedList.insert(2);
linkedList.insert(3);
linkedList.insert(4);

console.log('Linked List:');
let current = linkedList.head;
while (current) {
    console.log(current.data);
    current = current.next;
}

console.log('Deleting node with data 2:');
linkedList.delete(2);

console.log('Linked List after deletion:');
current = linkedList.head;
while (current) {
    console.log(current.data);
    current = current.next;
}

const searchResult = linkedList.search(3);
console.log('Search for node with data 3:', searchResult ? 'Found' : 'Not found');

console.log('Detecting if the linked list has a cycle:');
console.log('Has Cycle:', linkedList.hasCycle());

// Create a cycle in the linked list for demonstration
const node = linkedList.search(4); // Find the node with value 4
node.next = linkedList.head; // Set the cycle to the beginning of the list

console.log("\nDetecting if the linked list has a cycle after creating a cycle:");
console.log("Has Cycle:", linkedList.hasCycle());