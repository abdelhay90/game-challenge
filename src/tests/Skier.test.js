import 'babel-polyfill'
import {Skier} from "../Entities/Skier";


describe('Skier', function () {
    it('should loaded successfully', function () {
        let skier = new Skier(0, 0);
        expect(skier).toBeDefined()
    });

    it('should jump then land', async function () {
        let skier = new Skier(0, 0);
        skier.moveSkierDown();
        await skier.jump();
        expect(skier.currentState.jumping).toEqual(false)
    });

    it('should be in jumping state', function () {
        let skier = new Skier(0, 0);
        skier.moveSkierDown();
        skier.jump();
        expect(skier.jumping).toEqual(true)
    });

    it('should slow down', function () {
        let skier = new Skier(50, 50);
        skier.turnLeft();
        skier.turnLeft();
        skier.turnUp();
        expect(skier.y).not.toEqual(0)
    });

    it('should turn right', function () {
        let skier = new Skier(10, 10);
        skier.turnDown();
        skier.turnDown();
        skier.turnRight();
        skier.turnRight();
        skier.turnRight();
        expect(skier.y).not.toEqual(0)
    });
});
