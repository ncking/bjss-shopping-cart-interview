
/*
 * 
 */
module.exports = function (stockItem) {
    var quantity = 0;

    return {
        /*
         *
         */
        getStockItem: function () {
            return stockItem;
        },
        /*
         * 
         */
        getTotal: function () {
            var unitPrice = this.getStockItem().getPrice();
            return this.getQuantity() * unitPrice;
        },
        /*
         *
         */
        getQuantity: function () {
            return quantity;
        },
        /*
         *
         */
        adjustQuantity: function (amt) {
            quantity += parseInt(amt);
            return this;
        },
    }

}
