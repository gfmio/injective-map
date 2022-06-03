import type { InjectiveMapLike } from "./InjectiveMapLike";

export interface InjectiveMapProps<K, V> {
  entries?:
    | Array<[K, V]>
    | Map<K, V>
    | (K extends keyof any ? Record<K, V> : never)
    | undefined;
  keyToValueMap?: Map<K, V>;
  valueToKeyMap?: Map<V, K>;
}

/** A map-like object with unique keys and values enabling both to be queried. */
export class InjectiveMap<K, V> implements InjectiveMapLike<K, V> {
  protected readonly keyToValueMap;
  protected readonly valueToKeyMap;

  constructor(props: InjectiveMapProps<K, V> = {}) {
    const { entries, keyToValueMap, valueToKeyMap } = props;

    this.keyToValueMap = keyToValueMap ?? new Map<K, V>();
    this.valueToKeyMap = valueToKeyMap ?? new Map<V, K>();

    if (!entries) {
      return;
    } else if (Array.isArray(entries)) {
      entries.forEach(([key, value]) => this.set(key, value));
    } else if (entries instanceof Map) {
      entries.forEach((value, key) => this.set(key, value));
    } else if (typeof entries === "object") {
      (Object.keys(entries) as Array<K & string>).forEach((key) =>
        this.set(key, entries[key])
      );
    }
  }

  set(key: K, value: V): this {
    if (this.hasKey(key)) {
      this.deleteKey(key);
    }
    if (this.hasValue(value)) {
      this.deleteValue(value);
    }

    this.keyToValueMap.set(key, value);
    this.valueToKeyMap.set(value, key);

    return this;
  }

  hasKey(key: K): boolean {
    return this.keyToValueMap.has(key);
  }

  hasValue(value: V): boolean {
    return this.valueToKeyMap.has(value);
  }

  getValue(key: K): V | undefined {
    return this.keyToValueMap.get(key);
  }

  getKey(value: V): K | undefined {
    return this.valueToKeyMap.get(value);
  }

  deleteKey(key: K): boolean {
    if (!this.hasKey(key)) {
      return false;
    }

    const value = this.getValue(key);
    this.keyToValueMap.delete(key);
    if (value) {
      this.valueToKeyMap.delete(value);
    }

    return true;
  }

  deleteValue(value: V): boolean {
    if (!this.hasValue(value)) {
      return false;
    }

    const key = this.getKey(value);
    this.valueToKeyMap.delete(value);
    if (key) {
      this.keyToValueMap.delete(key);
    }

    return true;
  }

  clear(): void {
    this.keyToValueMap.clear();
    this.valueToKeyMap.clear();
  }

  delete(key: K): boolean {
    return this.deleteKey(key);
  }

  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    return this.keyToValueMap.forEach(callbackfn, thisArg);
  }

  get(key: K): V | undefined {
    return this.getValue(key);
  }

  has(key: K): boolean {
    return this.hasKey(key);
  }

  get size(): number {
    return this.keyToValueMap.size;
  }

  /** Returns an iterable of key, value pairs for every entry in the map. */
  entries(): IterableIterator<[K, V]> {
    return this.keyToValueMap.entries();
  }

  /** Returns an iterable of keys in the map */
  keys(): IterableIterator<K> {
    return this.keyToValueMap.keys();
  }

  /** Returns an iterable of values in the map */
  values(): IterableIterator<V> {
    return this.valueToKeyMap.keys();
  }

  /** Returns an iterable of entries in the map. */
  [Symbol.iterator]() {
    return this.keyToValueMap[Symbol.iterator]();
  }

  readonly [Symbol.toStringTag] = "InjectiveMap";
}
