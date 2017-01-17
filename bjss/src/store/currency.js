module.exports = (function () {
    /*
     * 
     */
    var currencies = {
        GBP: {title: 'UK pound', symbol: '£'},
        USD: {title: 'US Dollar', symbol: '$'},
        AED: {title: 'United Arab Emirates Dirham', symbol: 'درهم'}

    };
    var API_KEY = '1012f4f88519dd41e75aba9574894b07';
    var selectedCurrency = 'GBP';
    var poundDollarRatio = 0;
    var quotes = {};

    return {
        init: function (cb) {

            $.ajax({
                cache: false,
                data: {
                    access_key: API_KEY,
                    currencies: Object.keys(currencies).join(','),
                    format: 1
                },
                method: 'GET',
                url: 'http://www.apilayer.net/api/live',
                dataType: 'json', //Zepto needs this https://github.com/madrobby/zepto/issues/693
            }).done(function (response) {
                if (response.success && response.quotes) {
                    poundDollarRatio = 1 / parseFloat(response.quotes.USDGBP);
                    quotes = response.quotes;
                    cb();
                }
            }).always(function (response) {

            });
        },
        /*
         * 
         */
        getAll: function () {
            return currencies;
        },
        /*
         * 
         */
        convert: function (val) {
            var dollars = poundDollarRatio * parseFloat(val);
            return quotes['USD' + selectedCurrency] * dollars;
        },
        /*
         * 
         */
        setCurrency: function (val) {
            selectedCurrency = val;
        },
        /*
         * 
         */
        getSymbol: function () {
            return currencies[selectedCurrency].symbol;
        }
    }
})();