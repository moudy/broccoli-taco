**arguments:** (args...)  
Adds fingerprinted site.js and page.js (when available) files to the page.
``` hbs
<!-- global 'site.js' and current page's 'page.js' -->
{{javascript-tags}}

<!-- only that page's 'page.js' -->
{{javascript-tags 'page'}}

<!-- only the global 'site.js' -->
{{javascript-tags 'site'}}
```

