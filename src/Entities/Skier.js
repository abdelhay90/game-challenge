import * as Constants from "../Constants";
import {Entity} from "./Entity";
import {intersectTwoRects, Rect} from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    currentState = {
        jumping: false,
        landingTime: 0,
        frames: 1,
    };

    jumpingTimer = 0;

    killed = false;

    constructor(x, y) {
        super(x, y);
        this.killed = false;
    }

    /**
     * set current direction and update assets
     * @param direction
     */
    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    /**
     * update current asset name
     */
    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    /**
     * move the skier sprite according to its direction
     */
    move() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    /**
     * move skier left
     */
    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    /**
     * move skier left and down with speed
     */
    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * move skier down with speed
     */
    moveSkierDown() {
        this.y += this.speed;
    }

    /**
     * move skier right and down with speed
     */
    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * move skier to the right
     */
    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    /**
     * slow down the skier with constant speed
     */
    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    /**
     * move skier left and update skier when it crash an obstacle
     */
    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.moveSkierLeft();
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    /**
     * move skier right and update skier when it crash an obstacle
     */
    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.moveSkierRight();
        } else {
            this.setDirection(this.direction + 1);
        }
    }

    /**
     * move skier up and slow down
     */
    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
            this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    /**
     * move skier down and speed up
     */
    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    /**
     * check if the skier hit obstacle and update its sprite state on canvas
     * @param obstacleManager
     * @param assetManager
     */
    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        if (asset) {
            const skierBounds = new Rect(
                this.x - asset.width / 2,
                this.y - asset.height / 2,
                this.x + asset.width / 2,
                this.y - asset.height / 4
            );

            // check if there are a collision or not, by intersecting the bounds of
            // the sprite with the bounds of the obstacle
            const collision = obstacleManager.getObstacles().find((obstacle) => {
                const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
                const obstaclePosition = obstacle.getPosition();
                const obstacleBounds = new Rect(
                    obstaclePosition.x - obstacleAsset.width / 2,
                    obstaclePosition.y - obstacleAsset.height / 2,
                    obstaclePosition.x + obstacleAsset.width / 2,
                    obstaclePosition.y
                );
                if (obstacle.assetName.includes('rock') && this.currentState.jumping)
                    return false;
                return intersectTwoRects(skierBounds, obstacleBounds);
            });

            // if collided set current direction crash to update the sprite
            if (collision) {
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            }
        }
    }

    /**
     * getter for checking if the skier can jump or not
     * @returns {boolean}
     */
    get canJump() {
        return this.direction !== Constants.SKIER_DIRECTIONS.CRASH &&
            this.direction !== Constants.SKIER_DIRECTIONS.LEFT &&
            this.direction !== Constants.SKIER_DIRECTIONS.RIGHT &&
            Date.now() - this.currentState.landingTime > Constants.SKIER_TIME_DIFF_BETWEEN_JUMPS;
    }

    /**
     * returning if the skier is in jumping state
     * @returns {boolean}
     */
    get jumping() {
        return this.currentState.jumping;
    }

    /**
     * applying jumping rules on the skier
     */
    jump() {
        return new Promise((resolve) => {
            if (this.canJump) {
                this.currentState.jumping = true;
                this.currentState.frames = 1;
                this.setDirection(Constants.SKIER_DIRECTIONS.JUMPING_1);
                this.moveSkierDown();
                this.jumpingTimer = setInterval(() => {
                    this.currentState.frames++;
                    if (this.currentState.frames > 5) {
                        this.land();
                        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
                        this.moveSkierDown();
                        resolve();
                        return;
                    }
                    this.setDirection(
                        (Constants.SKIER_DIRECTIONS.JUMPING_1 + this.currentState.frames - 1)
                    );
                    this.moveSkierDown();

                }, Constants.SKIER_TIME_INTERVAL_FOR_JUMPS_ANIMATION);

            }
        });
    }

    /**
     * land on the ground and reset current skier state
     */
    land() {
        if (this.jumpingTimer) {
            clearInterval(this.jumpingTimer);
        }
        this.currentState.landingTime = Date.now();
        this.currentState.jumping = false;
        this.currentState.frames = 1;
    }
}
