**arguments:** (args...)  
Adds fingerprinted site.css and page.css (when available) files to the page.

``` hbs
<!-- global 'site.css' and current page's 'page.css' -->
{{css-tags}}

<!-- only that page's 'page.css' -->
{{css-tags 'page'}}

<!-- only the global 'site.css' -->
{{css-tags 'site'}}
```

