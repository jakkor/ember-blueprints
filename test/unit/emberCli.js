var should = require('chai').should(),
    expect = require('chai').expect(),
    Output = require('../../lib/ember-blueprints/emberCli/output'),
    EmberCli = require('../../lib/ember-blueprints/emberCli');

describe('EmberCli - create project', function() {
  it('Should pass correct parameters needed to create a project', function(){
    var projectName = 'testProjectName';
    var emberCli = new EmberCli();

    emberCli.runCommand = function(command, args, options) {
      command.should.equal('ember');
      args.should.be.an('array');
      args.should.deep.equals(['new', projectName]);
    };

    emberCli.createProject(projectName);
  });

});
