/*
 * 
 */
module.exports = function (data) {
    function get(key) {
        return data[key] || '';
    }
    return {
        /*
         *
         */
        getTitle: function () {
            return get('title');
        },
        /*
         *
         */
        getPrice: function () {
            return parseFloat(get('unit_price'));
        },
        /*
         *
         */
        getUnitDescription: function () {
            return get('unit_desc');
        },
        /*
         *
         */
        getId: function () {
            return get('id');
        },
        /*
         *
         */
        adjustQuantity: function (amt) {
            data['num'] = parseInt(data['num']) + parseInt(amt);
            return this;
        },
    }

}
