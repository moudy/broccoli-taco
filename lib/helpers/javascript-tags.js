module.exports = function () {
  function makeTag (name) {
    name = '/'+name;
    return '<script src="'+name+'"></script>';
  }

  function filterJS (file) {
    return /(js)$/.test(file);
  }

  return this.assets.filter(filterJS).map(makeTag).join('\n');
};


