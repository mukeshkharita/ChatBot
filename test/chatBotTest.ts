import * as assert from 'assert';
import Conversation from '../chatBot';

describe('Conversation', function() {
	describe('loadInitialState', function() {
		let conversation = new Conversation('./troubleshooting.json');
		let startState = {
		    "id": "start",
		    "question": "What kind of problem are you facing?",
		    "answerOptions": [
				{
					"answer": "My internet doesn't work",
					"nextState": "routerReset"
				},
				{
					"answer": "My phone doesn't work",
					"nextState": "phoneModel"
				}
		    ]
		};
    	it('should return start state', function() {
    		let reply = conversation.reply('');
      		assert.equal(JSON.stringify(reply), JSON.stringify(startState));
    	});
  	});

  	describe('loadNextState', function() {
  		let conversation = new Conversation('./troubleshooting.json');
		let nextState = {
			"id": "routerReset",
			"question": "Have you tried resetting your router?",
			"answerOptions": [
				{
					"answer": "Yes",
					"nextState": "anotherCable"
				},
				{
					"answer": "No",
					"nextState": "resetRouterEnd"
				}
			]
		};
    	it('should return routerReset state', function() {
    		conversation.reply('');
    		let reply = conversation.reply('My internet doesn\'t work');
      		assert.equal(JSON.stringify(reply), JSON.stringify(nextState));
    	});
  	});

  	describe('loadEndState', function() {
  		let conversation = new Conversation('./troubleshooting.json');
		let endState = {
			"id": "resetRouterEnd",
			"question": "Please try resetting the router?"
		};
    	it('should return resetRouterEnd state', function() {
    		conversation.reply('');
    		conversation.reply('My internet doesn\'t work');
    		let endStateReply = conversation.reply('No');
      		assert.equal(JSON.stringify(endStateReply), JSON.stringify(endState));
    	});
  	});

  	describe('invalidInput', function() {
  		let conversation = new Conversation('./troubleshooting.json');
		let nextState = {
			"message": "NOTE: Invalid Input, Please try one of the answerOptions",
			"id": "routerReset",
			"question": "Have you tried resetting your router?",
			"answerOptions": [
				{
					"answer": "Yes",
					"nextState": "anotherCable"
				},
				{
					"answer": "No",
					"nextState": "resetRouterEnd"
				}
			]
		};
    	it('should return routerReset state with invalid input message', function() {
    		conversation.reply('');
    		conversation.reply('My internet doesn\'t work');
    		let reply = conversation.reply('Noo');
      		assert.equal(JSON.stringify(reply), JSON.stringify(nextState));
    	});
  	});
});