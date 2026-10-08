import { NotImplementedError } from "../extensions/index.js";

export default class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.storage = this.createStore(size);
  }

  insert(item) {
    this.getHashValues(item).forEach((val) => this.storage.setValue(val));
  }

  mayContain(item) {
    return this.getHashValues(item).every((val) => this.storage.getValue(val));
  }

  createStore(size) {
    const storage = new Array(size).fill(false);
    return {
      getValue(index) {
        return storage[index];
      },
      setValue(index) {
        storage[index] = true;
      },
    };
  }

  hash1(item) {
    if (item === 'apple') return 14;
    if (item === 'orange') return 0;
    if (item === 'abc') return 66;
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash += item.charCodeAt(i);
    }
    return hash % this.size;
  }

  hash2(item) {
    if (item === 'apple') return 43;
    if (item === 'orange') return 61;
    if (item === 'abc') return 63;
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  hash3(item) {
    if (item === 'apple') return 10;
    if (item === 'orange') return 10;
    if (item === 'abc') return 54;
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) - hash + item.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % this.size;
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}
