var Site = require('../../../index');
var site = new Site();

site.basePath = 'mounted-path';

module.exports = site.toTree();

