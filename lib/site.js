var fingerprint   = require('broccoli-fingerprint');
var browserify    = require('broccoli-browserify');
var mergeTrees    = require('broccoli-merge-trees');
var pickFiles     = require('broccoli-static-compiler');
var handlebars    = require('broccoli-handlebars');
var cleanCSS      = require('broccoli-clean-css');
var sass          = require('broccoli-sass');
var Handlebars    = require('handlebars');
var path          = require('path');
var walkSync      = require('walk-sync');
var requireDir    = require('require-dir');
var RenderContext = require('./render-context');

var ASSET_FILE = /(site|page)\.(css|scss|js)$/;
var CSS_FILE = /\.scss$/;
var JAVASCRIPT_FILE = /\.js/;

function filter (regex) {
  return function (str) {
    return regex.test(str);
  };
}

var Site = module.exports = function () {
  this.tree = 'site';
  this.pagesTree = 'site/pages';

  this.scssTree = this.pickFiles(this.tree, 'scss');

  this.env = {};

  this.files = walkSync('site');

  this.assetFiles = this.files.filter(filter(ASSET_FILE));
  this.cssFiles = this.assetFiles.filter(filter(CSS_FILE));
  this.javascriptFiles = this.assetFiles.filter(filter(JAVASCRIPT_FILE));

  this.helpers = this.loadHelpers();
};

Site.prototype.has = function (regex) {
  return this.files.filter(regex.test.bind(regex)).length;
};

Site.prototype.loadHelpers = function () {
  var ret = {};
  var userHelpersPath = path.join(process.cwd(), 'site', 'helpers');
  var helpers = requireDir('./helpers');
  var userHelpers = requireDir(userHelpersPath);
  var key;
  for (key in userHelpers) ret[key] = userHelpers[key];
  for (key in helpers) ret[key] = helpers[key];
  return ret;
};

Site.prototype.pickFiles = function (tree, extensions) {
 if ('string' === typeof extensions) extensions = [extensions];
 return pickFiles(tree, {
    srcDir: '/'
  , files: extensions.map(function (ext) { return '**/*.'+ext; })
  , destDir: '/'
  });
};

Site.prototype.scss = function () {
  var trees = this.cssFiles.map(function (file) {
    var name = file.replace(CSS_FILE, '.css').replace(/pages/, '');
    var css = sass([this.scssTree], file, name);

    css = this.compressCss(css);

    return css;
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.compressCss = function (tree) {
  if (!this.env.production) {
    tree = cleanCSS(tree);
  }
  return tree;
};

Site.prototype.javascript = function () {
  var trees = this.javascriptFiles.map(function (file) {
    return browserify(this.tree, {
      entries: ['./'+file]
    , outputFile: file.replace(/pages/, '')
    , bundle: {debug: !this.env.production}
    });
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.handlebars = function () {
  this.renderContext = new RenderContext({
    assetFiles: this.assetFiles
  , manifest: this.manifest
  });

  var handlebarsExtensions = [];
  if (this.has(/hbs$/)) handlebarsExtensions.push('hbs');
  if (this.has(/handlebars/)) handlebarsExtensions.push('handlebars');
  this.handlebarsTree = this.pickFiles(this.pagesTree, handlebarsExtensions);

  var context = this.renderContext.toJSON.bind(this.renderContext);

  return handlebars(this.handlebarsTree, {
    context: context
  , helpers: this.helpers
  , handlebars: Handlebars
  , partials: 'site/partials'
  });
};

Site.prototype.html = function () {
  return this.pickFiles(this.pagesTree, 'html');
};

Site.prototype.css = function () {
  var css = this.pickFiles(this.tree, 'css');
  css = this.compressCss(css);
  return css;
};

Site.prototype.assets = function () {
  var  tree = [];

  if (this.has(/scss$/)) tree.push(this.scss());
  if (this.has(/css$/)) tree.push(this.css());
  if (this.has(/js$/)) tree.push(this.javascript());

  if (tree.length) {
    tree = mergeTrees(tree);
    tree = fingerprint(tree);
    return tree;
  }
};

Site.prototype.toTree = function () {
  var output = [];

  var assets = this.assets();

  if (assets) {
    this.manifest = fingerprint.manifest(assets);
    output.push(this.manifest);
    output.push(assets);
  }

  if (this.has(/html$/)) output.push(this.html());
  if (this.has(/(hbs|handlebars)$/)) output.push(this.handlebars());

  return mergeTrees(output, {overwrite: true});
};

