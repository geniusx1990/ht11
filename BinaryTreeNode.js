class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Метод для вставки нового узла в дерево.
    insert(value) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertRecursive(this.root, newNode);
        }
    }

    insertRecursive(currentNode, newNode) {
        if (newNode.value < currentNode.value) {
            if (!currentNode.left) {
                currentNode.left = newNode;
            } else {
                this.insertRecursive(currentNode.left, newNode);
            }
        } else {
            if (!currentNode.right) {
                currentNode.right = newNode;
            } else {
                this.insertRecursive(currentNode.right, newNode);
            }
        }
    }

    // search root
    search(value) {
        return this.searchRecursive(this.root, value);
    }

    searchRecursive(node, value) {
        if (!node) {
            return null;
        }

        if (value === node.value) {
            return node;
        } else if (value < node.value) {
            return this.searchRecursive(node.left, value);
        } else {
            return this.searchRecursive(node.right, value);
        }
    }

    // Tree traversals: internal (in-order), prefix (pre-order) and postfix (post-order).
    inOrderTraversal(callback) {
        this.inOrderRecursive(this.root, callback);
    }

    inOrderRecursive(node, callback) {
        if (node) {
            this.inOrderRecursive(node.left, callback);
            callback(node.value);
            this.inOrderRecursive(node.right, callback);
        }
    }

    preOrderTraversal(callback) {
        this.preOrderRecursive(this.root, callback);
    }

    preOrderRecursive(node, callback) {
        if (node) {
            callback(node.value);
            this.preOrderRecursive(node.left, callback);
            this.preOrderRecursive(node.right, callback);
        }
    }

    postOrderTraversal(callback) {
        this.postOrderRecursive(this.root, callback);
    }

    postOrderRecursive(node, callback) {
        if (node) {
            this.postOrderRecursive(node.left, callback);
            this.postOrderRecursive(node.right, callback);
            callback(node.value);
        }
    }

    isBST() {
        return this.isBSTUtil(this.root, Number.MIN_VALUE, Number.MAX_VALUE);
    }

    isBSTUtil(node, min, max) {
        if (node === null) {
            return true;
        }

        if (node.value < min || node.value > max) {
            return false;
        }

        return (
            this.isBSTUtil(node.left, min, node.value - 1) &&
            this.isBSTUtil(node.right, node.value + 1, max)
        );
    }

}





const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log('in-order:');
tree.inOrderTraversal((value) => console.log(value));

console.log('pre-order):');
tree.preOrderTraversal((value) => console.log(value));

console.log('post-order:');
tree.postOrderTraversal((value) => console.log(value));

const searchResult = tree.search(7);
console.log('search 7', searchResult ? "found" : "didn't find");



if (tree.isBST()) {
    console.log('Is BST');
} else {
    console.log('Not a BST');
}
