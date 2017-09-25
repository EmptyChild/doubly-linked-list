const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        if (!this.length) {
            this._head = this._tail = new Node(data, null, null);
        } else {
            this._tail.next = new Node(data, this._tail, null);
            this._tail = this._tail.next;
        }
        this._tail.index = this.length;
        this.length++;
        return this;
    }

    head() {
        return (this._head) ? this._head.data : null;
    }

    tail() {
        return (this._tail) ? this._tail.data : null;
    }

    at(index) {
        for (let entry of this) {
            if (entry.index == index) {
                return entry.data;
            }
        }
    }

    insertAt(index, data) {
        for (let entry of this) {
            if (entry.index > index) {
                entry.index++;
            }
            if (entry.index == index) {
                if (entry == this._head) {
                    this._head = entry.prev = new Node(data, null, entry);
                } else {
                    entry.prev.next = new Node(data, entry.prev, entry);
                    entry.prev.next.index = index;
                    entry.prev = entry.prev.next;
                }
                entry.index++;
                this.length++;
            }
        }
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this._head = this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        for (let entry of this) {
            if (entry.index == index) {
                if (entry.prev) {
                    entry.prev.next = entry.next;
                }
                if (entry.next) {
                    entry.next.prev = entry.prev;
                }
                this.length--;
            }
            if (entry.index > index) {
                entry.index--;
            }
        }
        return this;
    }

    reverse() {
        this._tail = this._head;
        let temp;
        for (let entry of this) {
            temp = entry.prev;
            entry.prev = entry.next;
            entry.next = temp;
            entry.index = this.length - 1 - entry.index;
            if (!entry.prev) {
                this._head = entry;
            }
        }
        return this;
    }

    indexOf(data) {
        for (let entry of this) {
            if (entry.data == data) {
                return entry.index;
            }
        }
        return -1;
    }

    [Symbol.iterator]() {
        let entry = this._head;
        let res;
        return {
            next() {
                if (entry) {
                    res = entry;
                    entry = entry.next;
                    return {
                        done: false,
                        value: res,
                    }
                } else {
                    return {
                        done: true,
                    }
                }
            }
        };
    }
}

module.exports = LinkedList;