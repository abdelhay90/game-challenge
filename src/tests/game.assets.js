import {Game} from "../Core/Game";

let game = null;
export const map = {};

/**
 * initialize game loop and return the game
 * @returns {Promise<Game>}
 */
export function initGame(newGame = false) {
    if (game && !newGame)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(game)
            }, 10)
        });
    return new Promise((resolve, reject) => {
        const skiGame = new Game();
        skiGame.load().then(() => {
            skiGame.init();
            skiGame.run();
            game = skiGame;
            resolve(skiGame);
        });
    })
}

export function keyboardKeyDown(keyCode) {
    map['keydown']({
        keyCode: keyCode,
        which: keyCode,
        preventDefault: () => {
        }
    })
}
