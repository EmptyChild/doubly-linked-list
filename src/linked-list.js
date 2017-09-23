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
        //this._tail.index = this.length;
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
            if (entry.index == index) {
                entry.data = data;
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
        let index = 0;
        return {
            next() {
                if (entry) {
                    res = entry;
                    res.index = index;
                    index++;
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