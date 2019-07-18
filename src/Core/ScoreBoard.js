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

    createScoreElement() {
        this.scoreElement = createNodeElement('span', {
            id: "scoreValue",
        }, this.scoreBoard);
        this.updateScore(this.score);
    }

    updateScore(value) {
        this.score = value;
        this.scoreElement.innerHTML = `${this.score}`;
    }
}
