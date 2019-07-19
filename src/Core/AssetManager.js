export class AssetManager {
    loadedAssets = {};

    constructor() {
    }

    /**
     * load game asset asynchronously
     * @param assets
     * @returns {Promise<void>}
     */
    async loadAssets(assets) {
        const assetPromises = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            const assetPromise = this.loadSingleAsset(assetUrl, assetName);
            assetPromises.push(assetPromise);
        }

        await Promise.all(assetPromises);
    }

    /**
     * loads single game asset
     * @param assetUrl
     * @param assetName
     * @returns {Promise<any>}
     */
    loadSingleAsset(assetUrl, assetName) {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.onload = () => {

                assetImage.width /= (assetUrl.includes('rhino') ? 1.5 : 2);
                assetImage.height /= (assetUrl.includes('rhino') ? 1.5 : 2);

                this.loadedAssets[assetName] = assetImage;
                resolve();
            };
            assetImage.src = assetUrl;
        });
    }

    /**
     * get asset by name
     * @param assetName
     * @returns {*}
     */
    getAsset(assetName) {
        return this.loadedAssets[assetName];
    }
}
