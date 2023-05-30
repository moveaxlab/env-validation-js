import { JSONData, JSONDataArray, JSONDataObject } from '../declarations';

function stripUndefinedFields(data: JSONData): JSONData {
  if (data instanceof Array) {
    const arrayData = data as JSONDataArray;

    return arrayData.reduce(
      (acc: JSONData[], val) => acc.concat([stripUndefinedFields(val)]),
      [] as JSONData[]
    );
  } else if (data instanceof Object) {
    const objectData = data as JSONDataObject;

    return Object.keys(objectData).reduce(
      (acc, key) => {
        if (objectData[key] !== undefined) {
          acc[key] = stripUndefinedFields(objectData[key]);
        }

        return acc;
      },
      {} as JSONDataObject
    );
  } else {
    return data;
  }
}

export { stripUndefinedFields };
