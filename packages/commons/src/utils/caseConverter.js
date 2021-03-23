const toCamelCase = snakeCase => snakeCase.replace(/_[a-z]/g, characters => characters[1].toUpperCase());

const toSnakeCase = camelCase => camelCase.replace(/[A-Z]/g, character => `_${character.toLowerCase()}`);

const convert = (obj, fn) => {
  // validate input
  if (obj === null || obj === undefined) return obj;
  if ((!(typeof obj === 'object')) || typeof obj === 'function') {
    return null;
  }

  // if argument is an array, apply this function with each element of array
  if (Array.isArray(obj)) {
    const newArray = obj.map(item => (typeof item === 'object' ? convert(item, fn) : item));
    return newArray;
  }

  // if argument is a normal object
  const newObject = {};
  Object.keys(obj).forEach((key) => {
    const newKey = fn(key);
    const newValue = typeof obj[key] === 'object'
      ? convert(obj[key], fn)
      : obj[key];
    newObject[newKey] = newValue;
  });
  return newObject;
};

const CaseConverter = {};

CaseConverter.toCamelCase = toCamelCase;
CaseConverter.toSnakeCase = toSnakeCase;
CaseConverter.snakeCaseToCamelCase = obj => convert(obj, toCamelCase);
CaseConverter.camelCaseToSnakeCase = obj => convert(obj, toSnakeCase);

export default CaseConverter;
