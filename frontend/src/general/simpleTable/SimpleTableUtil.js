export default function zipProperties(propertyNames, properties) {
  const arr = [];
  for (let i = 0; i < propertyNames.length; i += 1) {
    arr[i] = [propertyNames[i], properties[i]];
  }

  return arr;
}
