**arguments:** ( [name] )  
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

