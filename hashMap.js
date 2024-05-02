// basic hash map implementation in JavaScript
class HashMap {
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
    // calculate the hash code and return the index
    return this.hash(key) % this.buckets;
  }

  set(key, value) {
    const index = this.getIndex(key);
    console.log(`Index of ${key}: ${index}`);

    // if index is empty, create a new array
    if (!this.map[index]) {
      this.map[index] = [];
    }

    // check if index is out of bounds
    if (index < 0 || index >= this.map.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // if key already exists, update the value
    for (let entry of this.map[index]) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    this.map[index].push({ key, value });

    this.size++;

    // resize if needed
    if (this.size > this.buckets * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.getIndex(key);

    // if index is empty, return null
    if (!this.map[index]) {
      return null;
    }

    // if key already exists, return the value
    for (let i = 0; i < this.map[index].length; i++) {
      if (this.map[index][i].key === key) {
        return this.map[index][i].value;
      }
    }

    // if key does not exist, return null
    return null;
  }

  has(key) {
    const index = this.getIndex(key);

    // if index is empty, return false
    if (!this.map[index]) {
      return false;
    }

    // if key already exists, return true
    for (let i = 0; i < this.map[index].length; i++) {
      if (this.map[index][i].key === key) {
        return true;
      }
    }

    // if key does not exist, return false
    return false;
  }

  remove(key) {
    const index = this.getIndex(key);

    // if index is empty, return false
    if (!this.map[index]) {
      return false;
    }

    // if key already exists, remove the key and return true
    for (let i = 0; i < this.map[index].length; i++) {
      if (this.map[index][i].key === key) {
        this.map[index].splice(i, 1);
        this.size--;
        return true;
      }
    }
  }

  length() {
    // return the size of the map
    return this.size;
  }

  clear() {
    // clear the map and reset the size
    this.map = Array.from({ length: this.buckets }, () => []);
    this.size = 0;
  }

  keys() {
    const keys = [];

    // get all the keys in the map
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < this.map[i].length; j++) {
          keys.push(this.map[i][j].key);
        }
      }
    }

    return keys;
  }

  values() {
    const values = [];

    // get all the values in the map
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < this.map[i].length; j++) {
          values.push(this.map[i][j].value);
        }
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    // get all the entries in the map
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < this.map[i].length; j++) {
          entries.push([this.map[i][j].key, this.map[i][j].value]);
        }
      }
    }

    return entries;
  }

  resize() {
    // double the size of the map
    this.buckets *= 2;
    const oldMap = this.map;
    this.map = Array.from({ length: this.buckets }, () => []);
    this.size = 0;

    // rehash the old map
    for (let i = 0; i < oldMap.length; i++) {
      if (oldMap[i]) {
        for (let j = 0; j < oldMap[i].length; j++) {
          this.set(oldMap[i][j].key, oldMap[i][j].value);
        }
      }
    }
  }
}

// initialize the map
let myMap = new HashMap();

// set some key-value pairs
myMap.set("name", "John Doe");
myMap.set("age", 30);
myMap.set("dob", "01/01/1990");
myMap.set("address", "123 Main St");
myMap.set("city", "New York");
myMap.set("zip", 10001);
myMap.set("country", "USA");
myMap.set("planet", "Earth");
myMap.set("continent", "North America");

// play with map here
console.log(myMap.get("city"));

// view the whole map
console.log(myMap);
