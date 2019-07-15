import {Skier} from "../Entities/Skier";


describe('Skier', function () {
    it('should loaded successfully', function () {
        let skier = new Skier(0, 0);
        expect(skier).toBeDefined()
    });
});
