Any files in `site/helpers/` will be treated as helpers. Each helper should have its own file and export a single function.

``` js
// site/helpers/first-name.js

module.exports = function (value) {
  return value.split(' ')[0];
};
```

``` hbs
<!-- site/pages/about/index.hbs -->
{{first-name site.author.name}}
```

Helpers can require other modules or files like a normal node program. For example, to create a markdown helper that can require a file or be used as a block:
``` js
// page/helpers/markdown.js
var marked = require('marked');

module.exports = function (value) {
  var input;
  if ('string' === typeof value) {
    input = fs.readFileSync(path.join('site/pages', value)+'.md').toString();
  } else if ('object' === typeof value) {
    input = value.fn(this).trim();
  }
  return new Handlebars.SafeString(marked(input));
}
```

``` hbs
<!-- site/pages/about/index.hbs -->

{{markdown "about/bio"}}

{{#markdown}}
# Contact
- [email](mailto:foo@bar.com)
{{/markdown}}
```
