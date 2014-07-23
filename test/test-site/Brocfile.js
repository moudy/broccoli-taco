var BroccoliSite = require('../../index');

var site = new BroccoliSite();

site.basePath = 'foo';

module.exports = site.toTree();
