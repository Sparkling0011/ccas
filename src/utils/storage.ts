class storage {
  get(key: any) {
    const newkey = key.toString();
    const value = localStorage.getItem(newkey);
    if (value) return JSON.parse(value);
  }
  set(key: any, value: any) {
    if (!key || !value) return;
    localStorage.setItem(key.toString, JSON.stringify(value));
  }
  remove(key: string) {
    if (!key) return;
    localStorage.removeItem(key);
  }
}

export default new storage();
