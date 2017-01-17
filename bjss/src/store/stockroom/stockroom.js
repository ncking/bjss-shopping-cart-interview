var stockItem = require('./stock/stock_item');



var stockQueryResponse = [
    {
        title: 'Peas',
        unit_price: .95,
        unit_desc: 'per bag',
        id: 1
    },
    {
        title: 'Eggs',
        unit_price: 2.10,
        unit_desc: 'per dozen',
        id: 2
    },
    {
        title: 'Milk',
        unit_price: 1.30,
        unit_desc: 'per bottle',
        id: 3
    },
    {
        title: 'Beans',
        unit_price: .73,
        unit_desc: 'per can',
        id: 4
    }
];


/*
 * Single instance
 */
module.exports = (function () {

    var stockItems;
    /*
     * 
     */
    return {
        /*
         * 
         */
        findById: function (stockId) {
            var stockItem = _.find(this.getAllStock(), function (item) {
                return stockId == item.getId();
            });
            return _.isUndefined(stockItem) ? null : stockItem;
        },

        /*
         * Ajax call to reset sockroom from stockItem.uuid.
         * 
         */
        getAllStock: function () {
            var item;
            if (!stockItems) {
                stockItems = [];
                for (var i in stockQueryResponse) {
                    item = new stockItem(stockQueryResponse[i]);
                    stockItems.push(item);
                }
            }
            return stockItems;
        }
    }
})();
