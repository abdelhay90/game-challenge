import "babel-polyfill";
import * as Constants from "../Constants";
import * as testAssets from "./assets/game.assets";

beforeAll(async () => {
    Object.defineProperty(Image.prototype, 'src', {
        set(src) {
            setTimeout(() => {
                this.onload()
            }, 1);
        },
    });

    document.addEventListener = jest.fn((event, cb) => {
        testAssets.map[event] = cb;
    });

});

describe('Game Render', function () {
    test('Game renders successfully', async () => {
        const game = await testAssets.initGame();
        expect(game.gameWindow).toBeDefined();
    });

    test('Document to have canvas successfully', async () => {
        let canvas = document.getElementsByTagName('canvas');
        expect(canvas).not.toHaveLength(0);
    });

    test('Skier left direction', async () => {
        const game = await testAssets.initGame();

        testAssets.keyboardKeyDown(Constants.KEYS.LEFT);
        expect(game.skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

        testAssets.keyboardKeyDown(Constants.KEYS.LEFT);
        expect(game.skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);

    });

    test('Skier right direction', async () => {
        const game = await testAssets.initGame();
        game.skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

        testAssets.keyboardKeyDown(Constants.KEYS.RIGHT);
        expect(game.skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

        testAssets.keyboardKeyDown(Constants.KEYS.RIGHT);
        expect(game.skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);

    });

    test('Skier down direction', async () => {
        const game = await testAssets.initGame();
        game.skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

        testAssets.keyboardKeyDown(Constants.KEYS.DOWN);
        expect(game.skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);

    });

    test('Skier down direction', async () => {
        const game = await testAssets.initGame();
        let lastY = game.skier.y;
        testAssets.keyboardKeyDown(Constants.KEYS.UP);
        testAssets.keyboardKeyDown(Constants.KEYS.UP);
        expect(game.skier.y).toEqual(lastY);

    });

    test('Game pause/resume mechanism', async () => {
        const game = await testAssets.initGame();
        testAssets.keyboardKeyDown(Constants.KEYS.P);
        expect(game.currentAnimationFrame).toBeNull();


        testAssets.keyboardKeyDown(Constants.KEYS.R);
        expect(game.currentAnimationFrame).not.toBeNull();
    });

    test('Skier jumping', async () => {
        const game = await testAssets.initGame();
        testAssets.keyboardKeyDown(Constants.KEYS.SPACE);
        expect(game.skier.currentState.jumping).toEqual(true);
    });

    test('Loaded assets ', async function () {
        const game = await testAssets.initGame();
        expect(Object.keys(game.assetManager.loadedAssets)).not.toHaveLength(0);
    });

    test('Skier assets loaded ', async function () {
        const game = await testAssets.initGame();
        let assetsKeys = Object.keys(game.assetManager.loadedAssets);
        let skierAsset = assetsKeys.filter((item) => item.includes('skier'));
        expect(skierAsset).toBeTruthy();
    });

    test('Main assets loaded ', async function () {
        const game = await testAssets.initGame();
        let assetsKeys = Object.keys(game.assetManager.loadedAssets);

        let trees = assetsKeys.filter((item) => item.includes('tree'));
        expect(trees).toBeTruthy();

        let rocks = assetsKeys.filter((item) => item.includes('rock'));
        expect(rocks).toBeTruthy();

        let cluster = assetsKeys.filter((item) => item.includes('cluster'));
        expect(cluster).toBeTruthy();
    });
});

