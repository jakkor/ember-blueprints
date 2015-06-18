var should = require('chai').should(),
    Output = require('../../../lib/ember-blueprints/emberCli/output').output,
    ChildProcessMock = require('../../helpers/child_process_mock').child_process_mock,
    Logger_mock = require('../../helpers/logger_mock').logger;


var logger_mock = new Logger_mock();
var output = new Output(logger_mock);
var childProcessMock = new ChildProcessMock();

describe('EmberCli Output', function() {

  it('Should not filter specific messages', function(){
    output.shouldDisplayMessage("Test Message").should.equal(true);
    output.shouldDisplayMessage("there is A new version of ember-cli is available").should.equal(true);
    output.shouldDisplayMessage(" version:").should.equal(true);
    output.shouldDisplayMessage("installing something").should.equal(true);
  });

  it('Should filter specific messages', function(){
    output.shouldDisplayMessage("A new version of ember-cli is available").should.equal(false);
    output.shouldDisplayMessage("A new version of ember-cli is available here").should.equal(false);
    output.shouldDisplayMessage("version:").should.equal(false);
    output.shouldDisplayMessage("version:").should.equal(false);
    output.shouldDisplayMessage("version: something ").should.equal(false);
    output.shouldDisplayMessage("installing").should.equal(false);
  });

  it('Should pass/not pass specific messages to logger', function(){
    var testMessage = "Test message";
    output.message(testMessage);
    logger_mock.getLastMessage().should.equal(testMessage);

    testMessage = "there is A new version of ember-cli is available";
    output.message(testMessage);
    logger_mock.getLastMessage().should.equal(testMessage);

    testMessage = "A new version of ember-cli is available here";
    output.message(testMessage);
    should.not.exist(logger_mock.getLastMessage());

    testMessage = "version:";
    output.message(testMessage);
    should.not.exist(logger_mock.getLastMessage());

    testMessage = "installing";
    output.message(testMessage);
    should.not.exist(logger_mock.getLastMessage());
  });

  it('Should reply if needed', function(){
    var testMessage = "Test message";
    output.replyIfneeded(testMessage, childProcessMock);
    should.not.exist(childProcessMock.stdin.getLastWrite());

    testMessage = "Overwrite something";
    output.replyIfneeded(testMessage, childProcessMock);
    should.not.exist(childProcessMock.stdin.getLastWrite());

    testMessage = "something (Yndh)";
    output.replyIfneeded(testMessage, childProcessMock);
    should.not.exist(childProcessMock.stdin.getLastWrite());

    testMessage = "Overwrite (Yndh)";
    output.replyIfneeded(testMessage, childProcessMock);
    childProcessMock.stdin.getLastWrite().should.equal("Y" + '\n');
  });

});
