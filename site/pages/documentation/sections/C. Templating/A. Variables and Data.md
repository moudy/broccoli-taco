Each `index.hbs` file can have a corresponding `data.js` file. The value of that file is made a vailable to the template in the `{{page}}` namespace. The site can also have a global data file at `site/data.js`. Global data can be accessed through the `{{site}}` namespace.

``` js
/* site/pages/about/data.js
 * The following are equivalent
 * This can also be a JSON file: site/pages/about/data.json
 */

module.exports = {
  content: 'Foo Bar'
}

module.exports = function () {
  return {
    content: 'Foo Bar'
  }
}

module.exports = function () {
  return new RSVP.Promise(function (resolve) {
    resolve({
      content: 'Foo Bar'
    });
  });
}
```

``` hbs
<!-- site/pages/about/index.hbs -->

<h1>
  <!-- available in every template, defined in site/data.js -->
  {{site.title}}
</h1>
<p>
  <!-- only available in this template -->
  {{page.content}}
</p>
```
