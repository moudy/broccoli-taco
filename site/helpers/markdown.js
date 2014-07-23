var fs = require('fs');
var path = require('path');
var marked = require('marked');
var Handlebars = require('handlebars');
var hljs = require('highlight.js');

var renderer = new marked.Renderer();

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlight(lang, code).value;
  }
, renderer: renderer
, smartLists: true
, smartypants: true
, tables: true
});

module.exports = function (value) {
  var input;
  if ('string' === typeof value) {
    input = fs.readFileSync(path.join('site/pages', value)+'.md').toString();
  } else if ('object' === typeof value) {
    input = value.fn(this);
  }
  return new Handlebars.SafeString(marked(input));
};
