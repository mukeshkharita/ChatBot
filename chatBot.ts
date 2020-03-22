import * as fs from 'fs';

export default class Conversation {
	private readonly START: string = 'start';
	private readonly FIRST_MESSAGE_LENGTH: number = 0;

	private currentState: object = null;
	private troubleShootReplies: Array<object> = null;

	/**
	* Load file data into troubleShootReplies
	* param filePath file path to initialize conversation replies
	*/
	constructor(filePath: string) {
		let data = fs.readFileSync(filePath).toString();
		this.troubleShootReplies = JSON.parse(data);
	}

	/**
	 * Load and return next state to user
	 * @param message reply message
	 * @returns current state
	 */
	reply = (message: string): object => {
		let formattedMessage = message.trim();

		if (formattedMessage.length === this.FIRST_MESSAGE_LENGTH) {
			this.loadInitialState();
		} else if (this.currentState.hasOwnProperty('answerOptions')) {
			if (!this.loadNextState(formattedMessage)) {
				return this.handleInvalidInput();
			}
		}

		return this.currentState;
	}

	/**
	 * Load Intial State
	 * @returns void
	 */
	private loadInitialState = (): void => {
		this.troubleShootReplies.forEach((reply) => {
			if (reply["id"] === this.START) {
				this.currentState = reply;
			}
		})
	}

	/**
	 * Load next state if input is valid
	 * @param reply reply
	 * @returns true|false, true if input is valid, false otherwuse
 	 */
	private loadNextState = (reply: string): boolean => {
		let nextState = null;
		this.currentState['answerOptions'].forEach((option) => {
			if (reply === option['answer']) {
				nextState = option['nextState'];
			}
		});

		if (!nextState) {
			return false;
		}

		this.troubleShootReplies.forEach((reply) => {
			if (reply['id'] === nextState) {
				this.currentState = reply;
			}
		})

		return true;
	}

	/**
	 * Return invalid input object with message
	 * @returns current state with message
	 */
	private handleInvalidInput = (): object => {
		let currentStateWithMessage = {
			'message': 'NOTE: Invalid Input, Please try one of the answerOptions',
			...this.currentState
		}
		return currentStateWithMessage;
	}
}
