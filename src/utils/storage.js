// Persistence abstraction layer using localStorage
// Can be swapped for IndexedDB, PostgreSQL API, etc.

const STORAGE_PREFIX = 'aiml_planner_';

const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (e) {
      console.error(`Error removing ${key} from storage:`, e);
      return false;
    }
  },

  keys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(STORAGE_PREFIX)) {
        keys.push(key.substring(STORAGE_PREFIX.length));
      }
    }
    return keys;
  },

  clear() {
    const keys = this.keys();
    keys.forEach(key => this.remove(key));
  },

  exportAll() {
    const data = {};
    this.keys().forEach(key => {
      data[key] = this.get(key);
    });
    return data;
  },

  importAll(data) {
    try {
      Object.entries(data).forEach(([key, value]) => {
        this.set(key, value);
      });
      return true;
    } catch (e) {
      console.error('Error importing data:', e);
      return false;
    }
  }
};

export default storage;

