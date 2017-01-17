var SRC_DIR = '../../src/store';
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai



var curr = require(SRC_DIR + '/currency');
var basket = require(SRC_DIR + '/basket/basket');


describe('Basket', function () {
    it('getTotal() should return 0 if no items are passed in', function () {
        expect(basket.getTotal()).to.equal(0);
    });
});




