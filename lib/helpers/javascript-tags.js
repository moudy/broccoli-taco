module.exports = function () {
  var ret = [];
  var filename = this.filename.substr(0,this.filename.lastIndexOf('/')+1)+'page.js';

  function makeTag (name) {
    return '<script src="/'+name+'"></script>';
  }

  var site = this.assets['site.js'];
  site && ret.push(makeTag(site));

  var page = this.assets[filename];
  page && ret.push(makeTag(page));

  return ret.join('\n');
};


