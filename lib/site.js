var path = require('path');
var findup = require('findup-sync');
var projectRoot = path.dirname(findup('Brocfile.js'));
var projectModulesRoot = path.join(projectRoot, 'node_modules');

function projectRequire (name) {
  try {
   return require(path.join(projectModulesRoot, name));
  } catch (e) {
    if (!(e.code && e.code === 'MODULE_NOT_FOUND')) {
      throw (e);
    }
  }
}

var base64CSS        = projectRequire('broccoli-base64-css');
var fingerprint      = projectRequire('broccoli-fingerprint');
var browserify       = projectRequire('broccoli-browserify');
var cleanCSS         = projectRequire('broccoli-clean-css');
var sass             = projectRequire('broccoli-sass');
var uglifyJavaScript = projectRequire('broccoli-uglify-js');

var mergeTrees       = require('broccoli-merge-trees');
var pickFiles        = require('broccoli-static-compiler');
var UnwatchedTree    = require('broccoli-unwatched-tree');
var handlebars       = require('./broccoli-taco-handlebars');
var Handlebars       = require('handlebars');
var fs               = require('fs');
var path             = require('path');
var walkSync         = require('walk-sync');
var requireDir       = require('require-dir');
var RenderContext    = require('./render-context');

var SCSS_ASSET = /(site|page)\.scss$/;
var CSS_ASSET = /(site|page)\.css$/;
var JAVASCRIPT_ASSET = /(site|page)\.js/;

function filter (regex) {
  return function (str) {
    return regex.test(str);
  };
}

var Site = module.exports = function (options) {
  if (!(this instanceof Site)) return new Site(options);

  this.options = options || {};

  this.env = process.env.BROCCOLI_TACO_ENV || 'development';
  this.cwd = process.cwd();
  this.tree = 'site';
  this.pagesTree = new UnwatchedTree('site/pages');

  this.files = walkSync('site');

  this.scssFiles = this.files.filter(filter(SCSS_ASSET));
  this.javascriptFiles = this.files.filter(filter(JAVASCRIPT_ASSET));
};

Site.prototype.has = function (regex) {
  return this.files.filter(regex.test.bind(regex)).length;
};

Site.prototype.loadHelpers = function () {
  var ret = {};
  var userHelpersPath = path.join(this.cwd, 'site', 'helpers');
  var helpers = requireDir('./helpers');
  var userHelpers;
  var key;

  if (fs.existsSync(userHelpersPath)) {
    userHelpers = requireDir(userHelpersPath);
    for (key in userHelpers) {
      ret[key] = userHelpers[key];
    }
  }

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

Site.prototype.staticFiles = function () {
  return pickFiles(this.tree, {
    srcDir: '/static'
  , destDir: '/static'
  });
};

Site.prototype.scss = function () {
  if (this.scssFiles.length) {
    this.scssTree = this.pickFiles(this.tree, 'scss');
  }

  var trees = this.scssFiles.map(function (file) {
    var name = file.replace(/\.scss$/, '.css').replace(/pages/, '');
    var css = sass([this.scssTree], file, name);

    css = this.compressCss(css);
    css = this.base64CSS(css);

    return css;
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.base64CSS = function (tree) {
  if (!base64CSS) return tree;
  var options = this.options.base64CSS || {};
  options.imagePath = options.imagePath || 'site';
  options.extensions = options.extensions || ['css', 'scss'];
  return base64CSS(tree, options);
};

Site.prototype.compressCss = function (tree) {
  if (this.env === 'production') {
    tree = cleanCSS(tree);
  }
  return tree;
};

Site.prototype.javascript = function () {
  var trees = this.javascriptFiles.map(function (file) {
    var tree = browserify(this.tree, {
      entries: ['./'+file]
    , outputFile: file.replace(/pages/, '')
    , bundle: {debug: this.env !== 'production'}
    });

    if (this.env === 'production') {
      tree = uglifyJavaScript(tree);
    }

    return tree;
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.handlebars = function () {
  this.renderContext = new RenderContext({
    manifest: this.manifest
  , basePath: this.basePath
  });

  var handlebarsExtensions = [];
  if (this.has(/hbs$/)) handlebarsExtensions.push('hbs');
  if (this.has(/handlebars/)) handlebarsExtensions.push('handlebars');
  this.handlebarsTree = this.pickFiles(this.pagesTree, handlebarsExtensions);
  var handlebarsPagesGlobs = handlebarsExtensions.map(function (ext) { return '**/index.'+ext; });

  var context = this.renderContext.toJSON.bind(this.renderContext);

  var options = {
    context: context
  , helpers: this.loadHelpers.bind(this)
  , handlebars: Handlebars
  };

  if (fs.existsSync('site/partials')) options.partials = 'site/partials';

  return handlebars(this.handlebarsTree, handlebarsPagesGlobs, options);
};

Site.prototype.html = function () {
  return this.pickFiles(this.pagesTree, 'html');
};

Site.prototype.css = function () {
  var css = this.pickFiles(this.tree, 'css');
  css = this.compressCss(css);
  css = this.base64CSS(css);
  return css;
};

Site.prototype.assets = function () {
  var  tree = [];

  if (this.has(SCSS_ASSET)) tree.push(this.scss());
  if (this.has(CSS_ASSET)) tree.push(this.css());
  if (this.has(JAVASCRIPT_ASSET)) tree.push(this.javascript());

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
  if (this.has(/^static\/$/)) output.push(this.staticFiles());

  return mergeTrees(output, {overwrite: true});
};


