var data = require('./currencies.json');
if (!data.length) {
    throw new Error('Currencies empty');
}

module.exports = {
    /**
     * 
     * @returns {nm$_currencies.module.exports|nm$_currencies.exports|nm$_currencies.data}
     */
    getData: function () {
        return data;
    },
    /**
     * 
     * @returns {Array}
     */
    currencyCodes: function () {
        return data.map(function (currency) {
            return currency.id
        });
    },
    /**
     * 
     * @param {String{1,3}} currencyCode
     * @returns {Object}
     */
    getCurrency: function (currencyCode) {
        return data.filter(function (currency) {
            return currency.id === currencyCode
        }).pop();
    }
}

