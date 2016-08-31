var currencies = require('./currencies');
var API_KEY = '1012f4f88519dd41e75aba9574894b07'
/*
 * Free version of API, can only have USD as source currency,
 * but our stock item prices are in GBP.
 * So we must convert to GPB to USD to target currency, shortcutting for GBP
 *
 */
var quotes = null;
var poundDollarRatio = 0;

/**
 * 
 * @param {String{1,3}} code
 * @returns {String}
 */
function makeKey(code) {
    return 'USD' + code.toUpperCase();
}


module.exports = {
    /**
     * 
     * @param {String{1,3}} currencyCode
     * @param {Number} val
     * @returns {Promise}
     */
    convert: function (currencyCode, val) {
        return getQuotes().then(function () {
            var dollars = poundDollarRatio * parseFloat(val)
            var total = quotes[makeKey(currencyCode)] * dollars
            return total
        });
    }
}




/**
 * 
 * @returns {Promise}
 */
function getQuotes() {
    if (quotes) {
        return $.Deferred().resolve(true)
    }
    return $.ajax({
        cache: false,
        data: {
            access_key: API_KEY,
            currencies: currencies.currencyCodes().join(','),
            format: 1
        },
        method: 'GET',
        url: 'http://www.apilayer.net/api/live',
        dataType: 'json'
    }).then(function (response) {
        if (response.success && response.quotes) {
            poundDollarRatio = 1 / parseFloat(response.quotes[makeKey('GBP')])
            if (response.quotes)
                quotes = response.quotes
        }
    })
}
