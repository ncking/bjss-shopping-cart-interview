var format = require("util/format")


function BasketItem(stockItem) {
    this.stockItem = stockItem
    this.quantity = 1
}


BasketItem.prototype = {
    /**
     * 
     * @return {Int}
     */
    getId: function () {
        return this.stockItem.getId();
    },
    /**
     * 
     * @return {Float}
     */
    getTotal: function () {
        return format.float(this.getQuantity() * this.stockItem.getPrice());
    },
    /**
     * 
     * @returns {Int}
     */
    getQuantity: function () {
        return this.quantity;
    },
    /**
     * 
     * @param {type} amt
     * @returns {undefined}
     */
    adjustQuantity: function (amt) {
        this.quantity += parseInt(amt)
    }
}

/**
 * Module exports.
 * @public
 */
module.exports = BasketItem