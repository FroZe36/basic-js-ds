const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }

  add(data) {
    const addNode = (node, data) => {
      if (!node) {
        return new Node(data);
      } else if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    };
    this._root = addNode(this._root, data);
  }

  has(data) {
    const searchNode = (node, data) => {
      if (!node) {
        return false;
      } else if (node.data === data) {
        return true;
      }
      if (data < node.data) {
        return searchNode(node.left, data);
      } else {
        return searchNode(node.right, data);
      }
    };
    return searchNode(this._root, data);
  }

  find(data) {
    const findNode = (node, data) => {
      if (!node) {
        return null;
      } else if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        return findNode(node.right, data);
      } else {
        return findNode(node.left, data);
      }
    };
    return findNode(this._root, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) {
        return null;
      }
      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        if (!node.right && !node.left) {
          return null;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        let minRightChild = node.right;
        while (minRightChild.left) {
          minRightChild = minRightChild.left;
        }
        node.data = minRightChild.data;
        node.right = removeNode(node.right, minRightChild.data);
        return node;
      }
    };
    this.root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) {
      return null;
    }

    let current = this._root;

    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let current = this._root;

    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
