module.exports = function () {
  function makeTag (name) {
    name = '/'+name;
    return '<script src="'+name+'"></script>';
  }

  function filterJS (file) {
    return /(js)$/.test(file);
  }

  return this.assets
    .filter(filterJS)
    .sort(function (a) { return /^site/.test(a) ? 0 : 1; })
    .map(makeTag).join('\n');
};


