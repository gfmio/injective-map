# injective-map

`injective-map` implements a 1-to-1 map-like object with unique keys and values. This is useful if you need to ensure that each value only occurs exactly once. It is compatible with the standard `Map` type but also provides additional methods for finding the key for a particular value or deleting a value from the map.

## Install

```sh
# If you use npm
npm install injective-map

# If you use yarn
yarn add injective-map
```

## Usage

```ts
import { InjectiveMap, InjectiveMapLike } from "injective-map";

// injective-map provides a class `InjectiveMap<K, V>`
const injectiveMap = new InjectiveMap<string, number>();

// injective-map also provides an interface, `InjectiveMapLike<K, V>` that the class implements
const injectiveMapLike: InjectiveMapLike<string, number> = injectiveMap;

// You can also specify some configuration options when instantiating the `InjectiveMap`
const anotherInjectiveMap = new InjectiveMap<string, number>({
  // `entries` can be used to specify initial entries that the map is instantiated with
  // You can specify it as an array of key-value pairs, another Map object or as a plain object (provided your key type)
  entries: [["zero", 0], ["one", 1]],
  // `keyToValueMap` can be used to specify a custom Map-like object for storing the key to value map
  keyToValueMap: new Map<string, number>(),
  // `valueToKeyMap` can be used to specify a custom Map-like object for storing the value to key map
  valueToKeyMap: new Map<number, string>(),
});

// You can use `set` to set a key-value pair
injectiveMap.set("a", 0)
// injectiveMap = { "a": 0 }

// Like a normal map, if you `set` the same key, the value is overwritten
injectiveMap.set("a", 1)
// injectiveMap = { "a": 1 }

// Unlike a normal map, if you `set` the another key with a value that is already in use, the old key is removed
injectiveMap.set("b", 1)
// injectiveMap = { "b": 1 }

injectiveMap.set("c", 2)
// injectiveMap = { "b": 1, "c": 2 }

// You can check if the map has a certain key using `hasKey` or just `has` like in a normal map
injectiveMap.hasKey("b")
// true
injectiveMap.has("a")
// false

// You can check if the map has a certain value using `hasValue`
injectiveMap.hasValue(1)
// true
injectiveMap.hasValue(0)
// false

// You can get the value corresponding to a key with `getValue` or just `get` like in a normal map
injectiveMap.getValue("b")
// 1
injectiveMap.get("a")
// undefined

// You can get the key corresponding to a value with `getKey`
injectiveMap.getKey(1)
// "b"
injectiveMap.getKey(0)
// undefined

// You can delete a key using `deleteKey` or just `delete` like in a normal map
injectiveMap.deleteKey("b")
// true
// injectiveMap = { "c": 2 }
injectiveMap.delete("a")
// false
// injectiveMap = { "c": 2 }

// You can also delete by `value` using `deleteValue`
injectiveMap.deleteValue(2)
// true
// injectiveMap = {}
```

# License

[MIT](LICENSE)
