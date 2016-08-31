var StockItem = require('./stock_item');
var stockQueryResponse = require('./stock.json');
/*
 * Single instance
 */
module.exports = {
    /*
     * 
     */
    stockItems: null,
   /**
    * 
    * @param {type} stockId
    * @returns {StockItem}
    */
    findById: function (stockId) {
        var arr = this.findAll();
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].getId() == stockId) {
                return arr[i];
            }
        }
    },

    /**
     * 
     * @returns {Array}
     */
    findAll: function () {
        var item, arr = [];
        if (!this.stockItems) {
            for (var i in stockQueryResponse) {
                item = new StockItem(stockQueryResponse[i]);
                arr.push(item);
            }
            this.stockItems = arr;
        }
        return this.stockItems;
    }
}
