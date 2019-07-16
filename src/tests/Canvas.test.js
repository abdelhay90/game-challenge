import * as Constants from "../Constants";
import {Canvas} from '../Core/Canvas';
import * as testAssets from "./assets/canvas.assets";

describe('Canvas', function () {
    test('Canvas to be initialized successfully', () => {
        let canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        expect(canvas).toBeTruthy();
    });

    test('Canvas to be created successfully and appended to document', () => {
        let canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        expect(canvas.ctx).not.toBeNull();

        let canvasEl = document.getElementsByTagName('canvas');
        expect(canvasEl).not.toHaveLength(0);
    });

    test('Canvas to set draw offset', () => {
        let canvas = testAssets.createCanvas();
        canvas.setDrawOffset(20, 40);
        expect(canvas.drawOffset).toEqual({x: 20, y: 40});
    });

    test('Canvas to be clear', () => {
        let canvas = testAssets.createCanvas();
        canvas.clearCanvas();
        canvas.clearCanvas = jest.fn();
        canvas.clearCanvas();

        expect(canvas.clearCanvas).toBeCalled();
    });

    test('Canvas to draw image', () => {
        let canvas = testAssets.createCanvas();
        canvas.drawImage(testAssets.createImage(),20,40, 10, 10);
        canvas.drawImage = jest.fn();
        canvas.drawImage();
        expect(canvas.drawImage).toBeCalled();
    })
});
