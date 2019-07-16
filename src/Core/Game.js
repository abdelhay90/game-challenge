import * as Constants from "../Constants";
import {AssetManager} from "./AssetManager";
import {Canvas} from './Canvas';
import {Skier} from "../Entities/Skier";
import {ObstacleManager} from "../Entities/Obstacles/ObstacleManager";
import {Rect} from './Utils';

export class Game {
    gameWindow = null;
    currentAnimationFrame = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * reset game of demand
     */
    resetGame() {
        cancelAnimationFrame(this.currentAnimationFrame);
        this.currentAnimationFrame = null;
        this.canvas.clearCanvas();
        this.skier = new Skier(0, 0);
        this.obstacleManager.obstacles = [];
        this.load().then(() => {
            this.init();
            this.run();
        });

    }

    /**
     * initialize game
     */
    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    /**
     * load game
     * @returns {Promise<void>}
     */
    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    /**
     * run/resume game loop
     */
    run() {
        this.resume();

        this.currentAnimationFrame = requestAnimationFrame(this.run.bind(this));
    }

    /**
     * set new animation frame request
     */
    setAnimationFrameRequest() {
        this.currentAnimationFrame = requestAnimationFrame(this.run.bind(this));
    }

    /**
     * resume game loop
     */
    resume() {
        this.canvas.clearCanvas();
        this.updateGameWindow();
        this.drawGameWindow();
    }

    /**
     * pause game loop
     */
    pause() {
        this.canvas.clearCanvas();
        cancelAnimationFrame(this.currentAnimationFrame);
        this.currentAnimationFrame = null;
        this.drawGameWindow();
    }

    /**
     * update game canvas and loop
     */
    updateGameWindow() {
        this.skier.move();

        const previousGameWindow = this.gameWindow;

        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
    }

    /**
     * draw the game canvas according skier position
     */
    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    /**
     * calculate game window width and height
     */
    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    /**
     * game keys handle (UP, DOWN, LEFT, RIGHT, PAUSE, RESUME)
     * @param event
     */
    handleKeyDown(event) {
        switch (event.which) {
            case Constants.KEYS.LEFT:
                //turn left
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                //turn right
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                //slow down
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                // speed up / move down
                this.skier.turnDown();
                event.preventDefault();
                break;

            case Constants.KEYS.P:
                // game pause
                if (this.currentAnimationFrame) {
                    this.skier.turnDown();
                    this.pause();
                }
                event.preventDefault();
                break;
            case Constants.KEYS.R:
                // game resume
                if (!this.currentAnimationFrame) {
                    this.skier.turnDown();
                    this.resume();
                    this.setAnimationFrameRequest();
                }
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.jump();
                event.preventDefault();
                break;

            case Constants.KEYS.D:
                this.resetGame();
                event.preventDefault();
                break;
        }
    }
}
