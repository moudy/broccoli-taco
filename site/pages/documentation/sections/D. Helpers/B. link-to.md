**arguments:** (page [, model] [, attributes] )  
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



