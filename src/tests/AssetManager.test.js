import 'babel-polyfill'
import * as Constants from "../Constants";
import {AssetManager} from "../Core/AssetManager";


describe('Asset Manager', function () {
    test('should be initialized successfully', function () {
        let assetManager = new AssetManager();
        expect(assetManager).toBeTruthy();
    });

    test('should load assets', function () {
        let assetManager = new AssetManager();
        assetManager.loadAssets(Constants.ASSETS).then(() => {
            expect(Object.keys(assetManager.loadedAssets)).not.toHaveLength(0);
            done()
        })
    });

    test('should load single assets', function () {
        let assetManager = new AssetManager();
        assetManager.loadSingleAsset(
            Constants.ASSETS[Constants.SKIER_DOWN],
            Constants.SKIER_DOWN).then(() => {
            expect(Object.keys(assetManager.loadedAssets)).toHaveLength(0);
            done()
        })
    });

    test('should get loaded assets', function () {
        let assetManager = new AssetManager();
        assetManager.loadAssets(Constants.ASSETS).then(() => {
            expect(assetManager.getAsset(Constants.SKIER_DOWN)).toBeTruthy();
            done()
        })
    });
});
