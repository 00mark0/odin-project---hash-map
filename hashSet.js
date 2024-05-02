class HashSet {
  constructor(buckets = 16) {
    this.buckets = buckets;
    this.map = Array.from({ length: this.buckets }, () => []);
    this.loadFactor = 0.75;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  getIndex(key) {
    return this.hash(key) % this.buckets;
  }

  set(key) {
    const index = this.getIndex(key);
    console.log(`Index of ${key}: ${index}`);

    if (!this.map[index]) {
      this.map[index] = [];
    }

    if (index < 0 || index >= this.map.length) {
      throw new Error("Trying to access index out of bounds");
    }

    for (let entry of this.map[index]) {
      if (entry === key) {
        return;
      }
    }

    this.map[index].push(key);

    this.size++;

    if (this.size > this.buckets * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.getIndex(key);

    for (let entry of this.map[index]) {
      if (entry === key) {
        return entry;
      }
    }

    return null;
  }

  has(key) {
    const index = this.getIndex(key);

    for (let entry of this.map[index]) {
      if (entry === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.getIndex(key);

    for (let i = 0; i < this.map[index].length; i++) {
      if (this.map[index][i] === key) {
        this.map[index].splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.map = Array.from({ length: this.buckets }, () => []);
    this.size = 0;
  }

  keys() {
    const keys = [];

    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < this.map[i].length; j++) {
          keys.push(this.map[i][j]);
        }
      }
    }

    return keys;
  }

  resize() {
    this.buckets *= 2;
    this.size = 0;

    const oldMap = this.map;
    this.map = Array.from({ length: this.buckets }, () => []);

    for (let bucket of oldMap) {
      for (let key of bucket) {
        this.set(key);
      }
    }
  }
}

// initialize a new hash set
const hashSet = new HashSet();

// add some keys to the hash set
hashSet.set("apple");
hashSet.set("banana");
hashSet.set("cherry");
hashSet.set("date");
hashSet.set("elderberry");

// play around with the hash set
console.log(hashSet.remove("banana"));

// view the whole hash set
console.log(hashSet);
