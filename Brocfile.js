var Site = require('./index');
var site = new Site();

site.basePath = 'broccoli-site';

module.exports = site.toTree();

