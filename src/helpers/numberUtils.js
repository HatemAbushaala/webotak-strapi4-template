function isNumericString(value) {
  if (typeof value !== "string" || !value) return false;

  return (
    !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(value))
  ); // ...and ensure strings of whitespace fail
}

/* 
      this function is useful when you want to get number from anything with fullback for NaN
      so that we don't have to do type check and fallback
  */
function getNumber(number, fullback = 0) {
  return isNumber(number) ? Number(number) : fullback;
}

function isNumber(value) {
  if (typeof value === "string") return isNumericString(value);
  else return typeof value === "number";
}

/**
 *
 * @param {array} collection
 * @param {string} key
 * @returns
 */
const sumByKey = (collection, key) => {
  let sum = 0;
  collection.forEach((item) => {
    sum += item[key];
  });
  return sum;
};
/**
 *
 * @param {array} collection
 * @param {function} fn
 * @returns
 */
const sumBy = (collection, fn) => {
  let sum = 0;
  collection.forEach((item) => {
    sum += fn(item);
  });
  return sum;
};

module.exports = {
  isNumber,
  getNumber,
  isNumericString,
  sumByKey,
  sumBy,
};
