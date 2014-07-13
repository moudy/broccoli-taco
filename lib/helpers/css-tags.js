module.exports = function () {
  function makeTag (name) {
    name = '/'+name.replace(/scss$/, 'css');
    return '<link href="'+name+'" rel="stylesheet" type="text/css">';
  }

  function filterCSS (file) {
    return /(css|scss)$/.test(file);
  }

  return this.assets.filter(filterCSS).map(makeTag).join('\n');
};


