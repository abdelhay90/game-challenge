import * as Constants from "../Constants";
import {Entity} from "./Entity";
import {intersectTwoRects, Rect} from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RHINO_DEFAULT;
    direction = Constants.RHINO_DIRECTIONS.DEFAULT;
    speed = Constants.RHINO_STARTING_SPEED;
    moving = false;
    currentState = {
        killing: false,
        frames: 1,
    };

    constructor(x, y) {
        super(x, y);
        this.moving = false;
        this.currentState = {
            killing: false,
            frames: 1,
        };
    }

    /**
     * getter to get killing state
     * @returns {boolean}
     */
    get isKilling() {
        return this.currentState.killing;
    }

    /**
     * reset rhino position and current state
     * @param x
     * @param y
     */
    resetPosition(x, y) {
        this.x = x;
        this.y = y;
        this.moving = false;
        this.currentState = {
            killing: false,
            frames: 1,
        };
        this.setDirection(Constants.RHINO_DIRECTIONS.DEFAULT)
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
        this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
    }

    /**
     * move the rhino sprite and update its moving assets
     */
    move(height) {
        this.moving = true;
        if (height) {
            this.y = height;
        }
        this.x -= this.speed;
        this.y += (this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER);
        if (this.x % 10 === 0) {
            this.toggleAsset();
        }
    }

    /**
     * toggle rhino direction asset image
     */
    toggleAsset() {
        if (this.direction === Constants.RHINO_DIRECTIONS.LEFT) {
            this.setDirection(Constants.RHINO_DIRECTIONS.LEFT_2);
        } else {
            this.setDirection(Constants.RHINO_DIRECTIONS.LEFT);
        }
    }

    /**
     * check if the rhino can catch the skier
     * @param skier
     * @param assetManager
     * @returns {boolean}
     */
    checkIfRhinoCatchSkier(skier, assetManager) {
        const asset = assetManager.getAsset(this.assetName);

        if (asset) {
            const rhinoBounds = new Rect(
                this.x - asset.width / 2,
                this.y - asset.height / 2,
                this.x + asset.width / 2,
                this.y - asset.height / 4
            );


            const skierAsset = assetManager.getAsset(skier.getAssetName());
            const skierPosition = skier.getPosition();
            const skierBounds = new Rect(
                skierPosition.x - skierAsset.width / 2,
                skierPosition.y - skierAsset.height / 2,
                skierPosition.x + skierAsset.width / 2,
                skierPosition.y
            );
            let collision = intersectTwoRects(rhinoBounds, skierBounds);

            if (collision) {
                //this.kill();
                this.currentState.killing = true;
                this.moving = false;
            }
            return this.isKilling;
        }
    }

    /**
     * killing frame mechanism in case rhino caught the skier
     * @returns {Promise<any>}
     */
    kill() {
        return new Promise((resolve) => {
            this.setDirection(Constants.RHINO_DIRECTIONS.LIFT);
            this.currentState.killing = true;
            this.timer = setInterval(() => {
                !this.showKillingScene() ? resolve() : null;
                // this.currentState.frames++;
                // if (this.currentState.frames > 6) {
                //     clearInterval(this.timer);
                //     this.currentState.killing = false;
                //     this.currentState.frames = 1;
                //     resolve();
                //     return;
                // }
                // this.setDirection(
                //     (Constants.RHINO_DIRECTIONS.LIFT + this.currentState.frames - 1)
                // )
            }, Constants.RHINO_TIME_INTERVAL_FOR_KILL_ANIMATION);
        })
    }

    /**
     * show killing scene on the screen
     * @returns {boolean}
     */
    showKillingScene() {
        this.currentState.frames++;
        if (this.currentState.frames > 6) {
            clearInterval(this.timer);
            this.currentState.killing = false;
            this.currentState.frames = 1;
            return false;
        }
        this.setDirection(
            (Constants.RHINO_DIRECTIONS.LIFT + this.currentState.frames - 1)
        );
        return true;
    }
}
