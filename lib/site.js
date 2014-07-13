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

var ASSET_FILE = /page\.(scss|js)$/;
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
  this.htmlTree = this.pickFiles(this.pagesTree, 'html');
  this.handlebarsTree = this.pickFiles(this.pagesTree, ['hbs']);

  this.env = {};

  this.assetFiles = walkSync('site').filter(filter(ASSET_FILE));
  this.cssFiles = this.assetFiles.filter(filter(CSS_FILE));
  this.javascriptFiles = this.assetFiles.filter(filter(JAVASCRIPT_FILE));

  this.renderContext = new RenderContext({
    assetFiles: this.assetFiles
  });

  this.helpers = this.loadHelpers();
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

Site.prototype.css = function () {
  var trees = this.cssFiles.map(function (file) {
    var name = file.replace(CSS_FILE, '.css').replace(/pages/, '');
    console.log(name);
    var css = sass([this.scssTree], file, name);

    if (!this.env.production) {
      css = cleanCSS(css);
    }

    //css = fingerprint(css);
    return css;
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.javascript = function () {
  console.log(this.javascriptFiles, this.tree);
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
  var context = this.renderContext.toJSON.bind(this.renderContext);
  return handlebars(this.handlebarsTree, {
    context: context
  , helpers: this.helpers
  , handlebars: Handlebars
  , partials: 'site/partials'
  });
};


Site.prototype.toTree = function () {
  var output = [this.htmlTree];

  function add (tree) {
    if (tree) {
      output.push(tree);
    }
  }

  [
    this.handlebars()
  , this.css()
  , this.javascript()
  ].forEach(add);

  return mergeTrees(output, {overwrite: true});
};


