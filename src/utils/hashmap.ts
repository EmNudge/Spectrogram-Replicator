export function getOr<T,U>(map: Map<T, U>, key: T, fallbackValue: U, badValue: U = undefined) {
  const value = map.get(key);
  if (value === badValue) return fallbackValue;
  return value;
}

export function getOrSet<T,U>(map: Map<T, U>, key: T, fallbackValue: U, badValue: U = undefined) {
  const value = getOr(map, key, fallbackValue, badValue);
  map.set(key, value);
  return value;
}