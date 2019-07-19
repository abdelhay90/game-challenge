import 'babel-polyfill'
import {Rhino} from "../Entities/Rhino";
import * as gameAssets from './assets/game.assets'
import * as Constants from '../Constants'

describe('Rhino', function () {
    it('should loaded successfully', function () {
        let rhino = new Rhino(0, 0);
        expect(rhino).toBeDefined()
    });

    it('should move rhino and change assests', function () {
        let rhino = new Rhino(
            (Constants.GAME_WIDTH + 70),
            ((Constants.GAME_HEIGHT * 0.45) - 16)
        );
        rhino.speed = 14;
        rhino.move(5);
        expect(rhino.direction).toEqual(Constants.RHINO_DIRECTIONS.LEFT);
    });

    test('should kill skier', async function () {
        let rhino = new Rhino(
            (Constants.GAME_WIDTH + 70),
            ((Constants.GAME_HEIGHT * 0.45) - 16)
        );

        await rhino.kill();

        expect(rhino.isKilling).toEqual(false);
    });



});
