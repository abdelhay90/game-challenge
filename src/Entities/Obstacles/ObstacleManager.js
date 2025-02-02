import * as Constants from '../../Constants';
import {randomInt} from '../../Core/Utils';
import {Obstacle} from "./Obstacle";

const DISTANCE_BETWEEN_OBSTACLES = 50;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;
const NEW_OBSTACLE_CHANCE = 8;

export class ObstacleManager {
    obstacles = [];

    constructor() {
    }

    /**
     * return all canvas obstacles
     * @returns {Array}
     */
    getObstacles() {
        return this.obstacles;
    }

    /**
     * draw obstacle on screen canvas
     * @param canvas
     * @param assetManager
     */
    drawObstacles(canvas, assetManager) {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(canvas, assetManager);
        });
    }

    /**
     * place initial obstacles on canvas
     */
    placeInitialObstacles() {
        const numberObstacles = Math.ceil(
            (Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) *
            (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER));

        const minX = -Constants.GAME_WIDTH / 2;
        const maxX = Constants.GAME_WIDTH / 2;
        const minY = STARTING_OBSTACLE_GAP;
        const maxY = Constants.GAME_HEIGHT / 2;

        for (let i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles.sort((obstacle1, obstacle2) => {
            return obstacle1.getPosition().y - obstacle2.getPosition().y;
        });
    }

    /**
     * draw new obstacles when the game drawn and canvas updates
     * @param gameWindow
     * @param previousGameWindow
     */
    placeNewObstacle(gameWindow, previousGameWindow) {
        const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE);
        if (shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE) {
            return;
        }

        if (gameWindow && previousGameWindow) {
            if (gameWindow.left < previousGameWindow.left) {
                this.placeObstacleLeft(gameWindow);
            } else if (gameWindow.left > previousGameWindow.left) {
                this.placeObstacleRight(gameWindow);
            }

            if (gameWindow.top < previousGameWindow.top) {
                this.placeObstacleTop(gameWindow);
            } else if (gameWindow.top > previousGameWindow.top) {
                this.placeObstacleBottom(gameWindow);
            }
        }
    };

    /**
     * place obstacle on left
     * @param gameWindow
     */
    placeObstacleLeft(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
    }

    /**
     * place obstacle on right
     * @param gameWindow
     */
    placeObstacleRight(gameWindow) {
        this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
    }

    /**
     * place obstacle on top
     * @param gameWindow
     */
    placeObstacleTop(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
    }

    /**
     * place obstacle on bottom
     * @param gameWindow
     */
    placeObstacleBottom(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
    }

    /**
     * place obstacle randomly according to screen positions
     * @param minX
     * @param maxX
     * @param minY
     * @param maxY
     */
    placeRandomObstacle(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
        const newObstacle = new Obstacle(position.x, position.y);

        this.obstacles.push(newObstacle);
    }

    /**
     * calculate new position between obstacles randomly
     * @param minX
     * @param maxX
     * @param minY
     * @param maxY
     * @returns {*|{x, y}|{x: *, y: *}}
     */
    calculateOpenPosition(minX, maxX, minY, maxY) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const foundCollision = this.obstacles.find((obstacle) => {
            return (
                x > (obstacle.x - DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + DISTANCE_BETWEEN_OBSTACLES)
            );
        });

        if (foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        } else {
            return {
                x: x,
                y: y
            };
        }
    }
}
