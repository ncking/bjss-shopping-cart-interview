function StockItem(data) {
    this._data = data;
}


StockItem.prototype = {
    /**
     * 
     * @param {String} key
     * @returns {unresolved}
     */
    get: function (key) {
        return this._data[key];
    },
    /**
     * 
     * @returns {String}
     */
    getTitle: function () {
        return this.get('title')
    },
    /**
     * 
     * @returns {Float}
     */
    getPrice: function () {
        return this.get('unit_price')
    },
    /**
     * 
     * @returns {String}
     */
    getUnitDescription: function () {
        return this.get('unit_desc')
    },
    /**
     * 
     * @returns {Int}
     */
    getId: function () {
        return this.get('id')
    }
}
/*
 * 
 */
module.exports = StockItem