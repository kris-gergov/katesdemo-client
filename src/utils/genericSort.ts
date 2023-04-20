import ISorter from '../interfaces/ISorter';

// comparator function for any property within type T
// works for: strings, numbers, and Dates (and is typed to accept only properties which are those types)
// could be extended for other types but would need some custom comparison function here
export function genericSort<T extends object>(
  objectA: T,
  objectB: T,
  sorter: ISorter<T>,
) {
  const result = () => {
    if (sorter.property.toString().includes('.')) {
      const nestedProperties = sorter.property.toString().split('.');
      if (
        objectA[nestedProperties[0]][nestedProperties[1]].toLowerCase() >
        objectB[nestedProperties[0]][nestedProperties[1]].toLowerCase()
      ) {
        return 1;
      } else if (
        objectA[nestedProperties[0]][nestedProperties[1]].toLowerCase() <
        objectB[nestedProperties[0]][nestedProperties[1]].toLowerCase()
      ) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (objectA[sorter.property] > objectB[sorter.property]) {
        return 1;
      } else if (objectA[sorter.property] < objectB[sorter.property]) {
        return -1;
      } else {
        return 0;
      }
    }
  };

  return sorter.isDescending ? result() * -1 : result();
}
