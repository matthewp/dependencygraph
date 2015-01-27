var assert = require('assert');

describe('dependencyGraph', function() {
  var dependencyGraph;

  beforeEach(function() {
    dependencyGraph = require("../lib/dependencygraph").withConfig('config');
    dependencyGraph.baseURL = __dirname + '/tests/basics';
  });

  it('basics work', function(done) {
    dependencyGraph([ 'main' ]).then(function(graph) {
      assert(graph.config, 'Config is part of it');
      assert(graph.main, 'Main is part of it');
      assert(graph.bar, 'Bar is part of it');

      assert.equal(graph.main.deps[0], 'foo', 'Depends on a foo');
      assert.equal(graph.main.dependencies[0], 'bar', 'Which is mapped to bar');
    }).then(done, done);
  });
});
