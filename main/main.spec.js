const main = require('./main')


//Require the dev-dependencies
let chai = require('chai');
let should = chai.should();

describe('Run Terraform', () => {
    it('should run Terraform', () => {
        // TODO
        chai.assert.equal(main.runTerraform(), undefined);
    });
});