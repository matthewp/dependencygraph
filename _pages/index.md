@page home DependencyGraph
@hide sidebar
@hide header
@hide title
@hide container
@hide article
@body

<section style="width: 800px; margin:100px auto 20px auto; overflow:hidden;text-align:center;">
<style>
  h1 {
    font-size: 3.5em;
  }
  footer .brand {
    display: none;
  }
</style>

# DependencyGraph

</section>

<section style="width: 800px; margin:50px auto 20px auto; overflow:hidden;text-align:center;">
<style>
  .btn-container {
    display: inline-block;
    text-align: left;
    width: 170px;
  }
  .btn {
    border: 1px solid #d9d9d9;
    background: #f7f8c3;
    padding: 10px 20px;
    display: inline-block;
    color: black;
    text-decoration: none;
  }
  .btn:hover {
    border-color: grey;
  }
  .ghb {
    margin-bottom: 0;
    vertical-align: middle;
  }
</style>

<span class="btn-container"><a href="docs/" class="btn">API</a></span><iframe class="ghb" src="https://ghbtns.com/github-btn.html?user=matthewp&repo=dependencygraph&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe><iframe class="ghb" src="https://ghbtns.com/github-btn.html?user=matthewp&repo=dependencygraph&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>

</section>

<section style="width: 800px; margin:0 auto; overflow:hidden;">

### Install

For use with SystemJS:

```shell
npm install dependencygraph --save
```

For use with StealJS:

```shell
npm install dependencygraph-steal --save
```

### Use

Creating an instance of `DependencyGraph` gives you the ability to reuse a set of
configuration through a common object. Whether using SystemJS or StealJS, the API
is the exact same.

```js
var DependencyGraph = require('dependencygraph');

var dependencyGraph = DependencyGraph()
  .root(__dirname + '/app')
  .config('config');

dependencyGraph.for('main').then(function(graph) {
  // Do what you need with `graph`
});
```

The function which retrieves the dependency graph is `dependencyGraph.for`. It returns
a Promise that will resolve with the graph object. The graph object looks like:

```js
{
  'main': {
    load: {
      name: 'main',
      address: '/path/to/main.js',
      source: 'module.exports = "bar";'
    },
    deps: ['foo'],
    dependencies: ['bar']
  }
}
```

Where each key in the object is a module and its value is a node containing `load`
(the load object is used in the various hooks of the import process), `deps` (the
unnormalized dependencies as declared in the source file) and `dependencies` (the
normalized dependencies as resolved; use these if you need to traverse a module's
dependencies).

### Credits

DependencyGraph is a fork of the module [steal-tools](https://github.com/bitovi/steal-tools/blob/master/lib/graph/make_graph.js) uses to get [the graph](https://github.com/bitovi/steal-tools/blob/master/lib/graph/make_graph.js) during it's build process. If you're looking to build a Steal project, steal-tools is the best way.

</section>
