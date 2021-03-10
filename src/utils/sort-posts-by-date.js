/**
 * Takes a collection and returns it back in date order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
module.exports = (collection) =>
  collection.sort((a, b) => (Date(a.data.date) > Date(b.data.date) ? 1 : -1));
