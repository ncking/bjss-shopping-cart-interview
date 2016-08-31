var currencies = require('./currencies');
var rates = require('./rates');
var currency;

var exchange = { 
   /**
    * 
    * @param {String{1,3}} currencyCode
    * @returns {undefined}
    */
    setCurrency: function (currencyCode) {
        currency = currencies.getCurrency(currencyCode);
    },
    /**
     * 
     * @returns {String}
     */
    getCurrencySymbol: function () {
        return currency.symbol
    },
     /**
      * 
      * @returns {String}
      */
    getCurrencyName: function () {
        return currency.name
    },
    /*
     * 
     * @returns {nm$_currencies.module.exports|nm$_currencies.exports|nm$_currencies.data}
     */
    getCurrencies: function () {
        return currencies.getData();
    },
   /**
    * 
    * @param {Number} val
    * @returns {Promise}
    */
    convert: function (val) {
        return rates.convert(currency.id, val)
    }
}

exchange.setCurrency('GBP')

module.exports = exchange
