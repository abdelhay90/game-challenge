import * as Constants from '../Constants';
import {createNodeElement} from './Utils';

export class ScoreBoard {
    constructor() {
        this.width = Constants.GAME_WIDTH;
        this.height = 100;
        this.score = 0;
        this.createScoreBoard();
        this.createScoreElement();
    }

    /**
     * create score board DOM element
     */
    createScoreBoard() {
        this.scoreBoard = createNodeElement('div', {
            id: "scoreBoard",
            innerHTML: "Score: ",
            style: {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }, document.body);
    }

    /**
     * create the score value DOM element
     */
    createScoreElement() {
        this.scoreElement = createNodeElement('span', {
            id: "scoreValue",
        }, this.scoreBoard);
        this.updateScore(this.score);
    }

    /**
     * update score according to specified value
     * @param value
     */
    updateScore(value) {
        this.score = value;
        this.scoreElement.innerHTML = `${this.score}`;
    }
}
