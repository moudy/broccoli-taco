module.exports = function () {
  var ret = [];
  var filename = this.filename.substr(0,this.filename.lastIndexOf('/')+1)+'page.css';

  function makeTag (name) {
    name = '/'+name.replace(/scss$/, 'css');
    return '<link href="'+name+'" rel="stylesheet" type="text/css">';
  }

  var site = this.assets['site.css'];
  site && ret.push(makeTag(site));

  var page = this.assets[filename];
  page && ret.push(makeTag(page));

  return ret.join('\n');
};


