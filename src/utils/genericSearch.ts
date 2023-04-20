// case insensitive search of n-number properties of type T
// returns true if at least one of the property values includes the query value
export function genericSearch<T>(
  object: T,
  properties: Array<keyof T | string>,
  query: string,
): boolean {
  if (query === '') {
    return true;
  }

  return properties.some(property => {
    const value = getPropertyValue(object, property);
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      Array.isArray(value)
    ) {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    }
    return false;
  });
}

function getPropertyValue<T>(object: T, property: keyof T | string): any {
  if (typeof property === 'string') {
    const [head, ...tail] = property.split('.');
    if (tail.length > 0) {
      return getPropertyValue(object[head] as any, tail.join('.'));
    }
    return object[head];
  }
  return object[property];
}
