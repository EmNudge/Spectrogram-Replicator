export function getOr<T,U>(map: Map<T, U>, key: T, fallbackValue: U, badValue: U | undefined = undefined) {
  const value = map.get(key);
  if (value === badValue) return fallbackValue;
  return value!;
}

export function getOrSet<T,U>(map: Map<T, U>, key: T, fallbackValue: U, badValue: U | undefined = undefined) {
  const value = getOr(map, key, fallbackValue, badValue);
  map.set(key, value);
  return value;
}

export function first<T, U>(map: Map<T, U>): [T, U] | null {
  for (const [key, value] of map) {
    return [key, value];
  }

  return null;
}

export function last<T, U>(map: Map<T, U>): [T, U] | null {
  let keyVal: { key: T, value: U } | null = null;
  for (const [key, value] of map) {
    keyVal = { key, value };
  }

  return keyVal && [keyVal.key, keyVal.value];
}