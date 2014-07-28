To create a 1:N mapping between an `index.hbs` template and data you can return an array as the page's data. The `filename` property is used as the path of the page. If no `filename` property is found then a hash of the data is used.

``` js
// site/pages/blog-post/data.js
var glob = require('glob');

module.exports = function () {
  var posts = glob.sync('**/*.md', {cwd: 'site/posts'});

  return posts.map(post, function (post) {
    var postTitle = path.basename(post, 'md');
    return {
      title: postTitle
    , body: fs.readFileSync(post).toString()
    , filename: postTitle.toLowerCase()
    }
  });
};
```

``` hbs
<!-- site/pages/blog-post/index.hbs -->
<h1>
  {{page.title}}
</h1>

{{#markdown}}
  {{page.body}}
{{/markdown}}
```

Assuming `site/posts/Foo.md` and `site/posts/Bar.md` it would create pages at http://example.com/foo and http://example.com/bar using the `site/pages/blog-post/index.hbs` template.

