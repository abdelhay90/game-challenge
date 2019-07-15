export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * asset name
     * @returns {string}
     */
    getAssetName() {
        return this.assetName;
    }

    /**
     * get sprite location on screen
     * @returns {{x: number, y: number}}
     */
    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    /**
     * draw entity on screen canvas
     * @param canvas
     * @param assetManager
     */
    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}
