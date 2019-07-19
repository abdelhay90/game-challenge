import * as Constants from '../Constants';
import {createNodeElement} from './Utils';

export class ScoreBoard {
    constructor() {
        this.width = Constants.GAME_WIDTH;
        this.height = 100;
        this.score = 0;
        this.createScoreBoard();
        this.createScoreElement();
        this.createGameStatus()
    }

    /**
     * create score board DOM element
     */
    createScoreBoard() {
        this.scoreBoard = createNodeElement('div', {
            id: "scoreBoard",
            style: {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }, document.body);
    }

    /**
     * create score board game status DOM element
     */
    createGameStatus() {
        this.gameStatus = createNodeElement('div', {
            id: "scoreBoardGameStatus",

        }, this.scoreBoard);
    }

    /**
     * create the score value DOM element
     */
    createScoreElement() {
        this.scoreElement = createNodeElement('div', {
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
        this.scoreElement.innerHTML = `Score: ${this.score}`;
    }

    setGameStatus(text){
        this.gameStatus.innerHTML = text;
    }
}
