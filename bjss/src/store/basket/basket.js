/*
 *
 */
module.exports = function (options) {

    var basketArray = [], stockRoom = options.stockRoom;

    if (!options.stockRoom) {
        // throw error
    }
    /*
     * 
     * 
     */
    function removeItem(basketItem) {
        var i = basketArray.indexOf(basketItem);
        if (i > -1) {
            basketArray.splice(i, 1);
        }
    }
    /*
     * 
     * 
     */
    function findInBasket(stockId) {
        var basketItem = _.find(basketArray, function (item) {
            return stockId == item.getStockItem().getId();
        });
        return _.isUndefined(basketItem) ? null : basketItem;
    }
    /*
     *
     */
    function change() {
        options.onChange();
    }
    /*
     * 
     */
    return {
        /*
         *
         */
        addItem: function (stockId) {
            var basketItem = findInBasket(stockId);
            if (!basketItem) {
                basketItem = stockRoom.findById(stockId);
                basketArray.push(basketItem);
            }
            basketItem.adjustQuantity(1);
            change();
        },
        /*
         * 
         */
        removeItem: function (stockId) {
            var basketItem = findInBasket(stockId);
            if (basketItem && basketItem.getQuantity()) {
                basketItem.adjustQuantity(-1);
                if (!basketItem.getQuantity()) {
                    removeItem(basketItem);
                }
                change();
            }
        },
        /*
         *
         */
        setStockRoom: function (newStockRoom) {
            stockRoom = newStockRoom;
            return this;
        },
        /*
         *
         */
        getItems: function () {
            return basketArray;
        },
        /*
         *
         */
        empty: function () {
            basketArray = [];
            change();
        },
        /*
         * 
         */
        getTotal: function () {
            var total = 0;
            for (var i = basketArray.length - 1; i >= 0; i--) {
                total += basketArray[i].getTotal();
            }
            return total;
        }
    }
};