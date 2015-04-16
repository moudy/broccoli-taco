### Installing

Install the command line utility globally via NPM. This makes `broccoli-taco new` available everywhere.
``` sh
npm install -g broccoli-taco
```

### Creating a Site

To create a new site, run the `new` command with the folder name as an argument. Then, install dependencies and run the development server. Your new site should now be available at [http://localhost:4200/](http://localhost:4200/).
``` sh
broccoli-taco new my-site
cd my-site && npm install
broccoli-taco serve
```

Now you can start adding pages, assets, and data.

### Building a Site

To build your entire site into a folder, you can run the `build` command with the destination folder as an argument. To compress assets, set the `BROCCOLI_TACO_ENV` variable to `production`.

``` sh
broccoli-taco build dist
# or
BROCCOLI_TACO_ENV=production broccoli-taco build dist
```

See [broccoli-taco.com](http://broccoli-taco.com) for full docs.

### Contributing

Issues and pull requests are welcome! Tests along with changes are also very welcome.

The best way to develop is to clone the project and then run [npm link](https://www.npmjs.org/doc/cli/npm-link.html) from inside the project folder. Tnen you can create a test site and run `npm link broccoli-taco` to link your project's broccoli-taco depenency to the cloned repo.

Tests can be run with

    cd test/sites/basic/
    npm install
    cd test/sites/dynamic/
    npm install
    cd test/sites/mounted/
    npm install
    npm test

### Todos/Ideas

- Make CSS preprocessor configurable or optional
- ES6 module transpiler option for clien-side assets?
- Refactor setup/teardown of build tests
