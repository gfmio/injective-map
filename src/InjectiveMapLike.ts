/** A map-like object with unique keys and values enabling both to be queried. */
export interface InjectiveMapLike<K, V> extends Map<K, V> {
  set(key: K, value: V): this;
  hasKey(key: K): boolean;
  hasValue(value: V): boolean;
  getValue(key: K): V | undefined;
  getKey(value: V): K | undefined;
  deleteKey(key: K): boolean;
  deleteValue(value: V): boolean;
}
