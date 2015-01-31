
exports.steal = function() {
  this.stealModule = require('steal');
  this.system(this.stealModule.System);

  this.setup = setup;
  this.preBuild = preBuild;
  this.preLocal = preLocal;
  this.teardown = teardown;

  return this;
};

function setup(localSystem, buildSystem) {
  this.oldSteal = global.steal;
  var steal = this.stealModule;
  this.localSteal = steal.clone(steal.addSteal(localSystem));
  this.buildSteal = steal.clone(steal.addSteal(buildSystem));
}

function preBuild() {
  global.steal = this.buildSteal;
}

function preLocal() {
  global.steal = this.localSteal;
}

function teardown() {
  global.steal = this.oldSteal;
}
