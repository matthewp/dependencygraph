var assert = require('assert');
var DependencyGraph = require('../lib/dependencygraph');

describe('dependencyGraph', function() {

  it('basics work', function(done) {
    var dependencyGraph = DependencyGraph()
      .root(__dirname + '/tests/basics')
      .config('config');

    dependencyGraph.for([ 'main' ]).then(function(graph) {
      assert(graph.config, 'Config is part of it');
      assert(graph.main, 'Main is part of it');
      assert(graph.bar, 'Bar is part of it');

      assert.equal(graph.main.deps[0], 'foo', 'Depends on a foo');
      assert.equal(graph.main.dependencies[0], 'bar', 'Which is mapped to bar');
    }).then(done, done);
  });

});
