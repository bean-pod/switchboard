export function zipProperties(properties) {
  return Object.keys(properties).map((propertyName) => {
    return [propertyName, properties[propertyName]];
  });
}
