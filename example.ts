import Conversation from './chatBot';

function example() {
	let conv = new Conversation('./troubleshooting.json');
	console.log(conv.reply(''));
	console.log(conv.reply('My internet doesn\'t work'));
	console.log(conv.reply('Yes'));
	console.log(conv.reply('Yes'));
}

example();