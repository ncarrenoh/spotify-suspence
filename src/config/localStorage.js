export default class LocalStorage {
  constructor(key = '') {
    this.key = key;
    this.localStorage = localStorage;
  }

  add(data) {
    return new Promise(resolve =>
      resolve(this.localStorage.setItem(this.key, JSON.stringify(data)))
    );
  }

  get() {
    return new Promise(resolve => resolve(JSON.parse(this.localStorage.getItem(this.key))));
  }

  delete() {
    this.localStorage.removeItem(this.key);
  }

  deleteAll() {
    this.localStorage.clear();
  }

  addToExistingKey(id, data) {
    let setterData = {};
    let current = this.get();

    setterData = {
      ...current,
      [id]: JSON.stringify(data),
    };

    this.add(JSON.parse(setterData));
  }

}