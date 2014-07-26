There are 4 built in helpers. You can add your own by creating a file in `site/helpers`.

<hr>

**css-tags** (args...)  
Adds fingerprinted site.css and page.css (when available) files to the page.

``` hbs
<!-- global 'site.css' and current page's 'page.css' -->
{{css-tags}}

<!-- only that page's 'page.css' -->
{{css-tags 'page'}}

<!-- only the global 'site.css' -->
{{css-tags 'site'}}
```

<hr>

**javascript-tags** (args...)  
Adds fingerprinted site.js and page.js (when available) files to the page.
``` hbs
<!-- global 'site.js' and current page's 'page.js' -->
{{javascript-tags}}

<!-- only that page's 'page.js' -->
{{javascript-tags 'page'}}

<!-- only the global 'site.js' -->
{{javascript-tags 'site'}}
```

<hr>

**layout** ( [name] )  
A block helper to wrap content in other markup. The layout file should include `{{{yield}}}` somewhere. Layouts can be nested inside each other.
``` hbs
<!-- defaults to 'site/layouts/default.hbs' -->
{{#layout}}
  <h1>Hello</h1>

  <!-- uses 'site/layouts/aricle.hbs' -->
  {{#layout 'article'}}
    <p>World</p>
  {{/layout}}

{{/layout}}
```

<hr>

**link-to** (page [, model] [, attributes] )  
Link to a page. The helper makes sure you don't have any broken links.
``` hbs
<!-- link to /documentation -->
{{#link-to 'documentation' class='foo' target='_blank'}}
  Documentation
{/link-to}}

<!-- link to /posts/:id -->
{{#each page.posts}}J
  {{#link-to 'post' this class='post'}}
    {{title}}
  {/link-to}}
{{/each}}
```


