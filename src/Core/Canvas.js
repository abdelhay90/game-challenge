/**
 * used to shape game window and hold the canvas which used to render the game on the window
 */
export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    drawOffset = {
        x: 0,
        y: 0
    };
    ctx = null;

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCanvas();
    }

    /**
     * create canvas used for rendering the game
     */
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = "skiCanvas";
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        document.body.appendChild(canvas);
    }

    /**
     * clear all drawing on the canvas
     */
    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    /**
     * set drawing offset on the canvas
     * @param x
     * @param y
     */
    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    /**
     * draw an image to the canvas  (TREES, ROCKS, MAIN CHARACTER)
     * @param image
     * @param x
     * @param y
     * @param width
     * @param height
     */
    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
    }
}
