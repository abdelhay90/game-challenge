import * as Constants from "../Constants";
import {AssetManager} from "./AssetManager";
import {Canvas} from './Canvas';
import {Skier} from "../Entities/Skier";
import {ObstacleManager} from "../Entities/Obstacles/ObstacleManager";
import {Rect} from './Utils';
import {Rhino} from "../Entities/Rhino";

export class Game {
    gameWindow = null;
    currentAnimationFrame = null;
    framesCounter = 0;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(
            (Constants.GAME_WIDTH + 70),
            ((Constants.GAME_HEIGHT * 0.45) - 16));
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * reset game elements like skier, rhino and frames counter
     */
    resetGameElements() {
        const rhinoPositions = [
            (Constants.GAME_WIDTH + 70),
            ((Constants.GAME_HEIGHT * 0.45) - 16)
        ];
        cancelAnimationFrame(this.currentAnimationFrame);
        this.currentAnimationFrame = null;
        this.skier = new Skier(0, 0);
        this.rhino.resetPosition(...rhinoPositions);
        this.framesCounter = 0;
    }

    /**
     * reset game of demand
     */
    reloadGame() {
        this.canvas.clearCanvas();
        this.obstacleManager.obstacles = [];
        this.resetGameElements();
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
        if (this.currentAnimationFrame) {
            if (!this.skier.killed)
                this.framesCounter++;

            if (this.rhino.moving && Math.abs(this.rhino.x - this.skier.x) > 500) {
                this.rhino.resetPosition((Constants.GAME_WIDTH + 70),
                    ((Constants.GAME_HEIGHT * 0.4) - 50));
                this.framesCounter = 0;
            }
        }
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

        this.checkIfRhinoReady();

        if (!this.rhino.isKilling) {
            this.skier.move();
        }

        const previousGameWindow = this.gameWindow;

        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        if (!this.rhino.isKilling)
            this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

    }

    /**
     * check if time elapsed for the rhino rising
     */
    checkIfRhinoReady() {
        if (this.framesCounter > Constants.RHINO_APPEARANCE_TIME) {
            if (!this.rhino.isKilling) {
                if (!this.rhino.moving) {
                    this.rhino.x = this.skier.x + (Constants.GAME_WIDTH / 2) + 100;
                }
                this.rhino.move(this.skier.y - (Constants.GAME_HEIGHT / 45));
                if (this.rhino.checkIfRhinoCatchSkier(this.skier, this.assetManager)) {
                    this.skier.killed = true;
                    this.rhino.kill().then(() => {
                        this.resetGameElements();
                    })
                }
            }
        }
    }

    /**
     * draw the game canvas according skier position
     */
    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        if (this.framesCounter > Constants.RHINO_APPEARANCE_TIME) {
            this.rhino.draw(this.canvas, this.assetManager);
        }

        if (!this.rhino.isKilling)
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
                this.skier.turnLeft();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                break;

            case Constants.KEYS.P:
                if (this.currentAnimationFrame) {
                    this.skier.turnDown();
                    this.pause();
                }
                break;
            case Constants.KEYS.R:
                if (!this.currentAnimationFrame) {
                    this.skier.turnDown();
                    this.resume();
                    this.setAnimationFrameRequest();
                }
                break;
            case Constants.KEYS.SPACE:
                this.skier.jump();
                break;
            case Constants.KEYS.D:
                this.reloadGame();
                break;
        }
        event.preventDefault();
    }
}
