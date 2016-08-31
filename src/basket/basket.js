var BasketItem = require('./basket_item');

/**
 * Module exports.
 * @public
 */
module.exports = function (stockRepository) {

    var basketArray = [];


    /*
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
        return basketArray.filter(function (item) {
            if (item.getId() == stockId) {
                return item;
            }
        }).pop()
    }

    /*
     * 
     */
    return {
        /*
         *
         */
        addItemById: function (stockId) {
            var basketItem = findInBasket(stockId);
            if (basketItem) {
                basketItem.adjustQuantity(1)
            } else {
                var stockItem = stockRepository.findById(stockId)
                basketItem = new BasketItem(stockItem)
                basketArray.push(basketItem)
            }
        },
        /*
         * 
         */
        removeItemById: function (stockId) {
            var basketItem = findInBasket(stockId);
            if (basketItem) {
                basketItem.adjustQuantity(-1);
                if (!basketItem.getQuantity()) {
                    removeItem(basketItem);
                }
            }
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
        },
        /*
         * 
         */
        getTotal: function () {
            return basketArray.reduce(function (total, item) {
                return total += Number(item.getTotal())
            }, 0);
        }
    }

}