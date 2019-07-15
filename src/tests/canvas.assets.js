import * as Constants from "../Constants";
import {Canvas} from "../Core/Canvas";

/**
 * create canvas object
 * @returns {Canvas}
 */
export function createCanvas(){
    return new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
}


export function createImage() {
    const assetImage = new Image();
    assetImage.src = 'fake/url';
    return assetImage
}
