To build your entire site into a folder you can run the `build` command with the destination folder as an argument. To compress assets set the `BROCCOLI_TACO_ENV` variable to `production`.

``` sh
broccoli-taco build dist
# or
BROCCOLI_TACO_ENV=production broccoli-taco build dist
```
