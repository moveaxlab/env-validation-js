/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
function turnArraysToSets(obj: any) {
  const res: any = {};
  if (!(obj instanceof Object)) {
    return obj;
  }
  if ('name' in obj && 'params' in obj) {
    return obj.name;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];
      if (Array.isArray(value)) {
        value = new Set(value.map(turnArraysToSets));
      } else if (typeof value === typeof {}) {
        value = turnArraysToSets(value);
      }

      res[key] = value;
    }
  }

  return res;
}

export { turnArraysToSets };
