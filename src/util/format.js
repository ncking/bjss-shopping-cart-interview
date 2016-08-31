module.exports = {
    /**
     * 
     * @param {Number} num
     * @param {Int} precision
     * @returns {Float}
     */
    float: function (num, precision) {
        return parseFloat(num).toFixed(2);
    }
}