/**
 * generate random integer number
 * @param min
 * @param max
 * @returns {number}
 */
export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * check if two rectangle intersected or not
 * @param rect1
 * @param rect2
 * @returns {boolean}
 */
export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

/**
 * rectangle used to shape sprite positions (TOP, LEFT, RIGHT, BOTTOM)
 * and check sprites collisions for game up
 */
export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}
