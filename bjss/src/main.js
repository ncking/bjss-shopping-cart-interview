"use strict";

var storeTemplate = require("./store/store_template.ejs");
var stockItemTemplate = require('./store/stockroom/stock/stock_template.ejs');
var stockroom = require('./store/stockroom/stockroom.js');
var basketTemplate = require('./store/basket/basket_template.ejs');
var currency = require('./store/currency');

var basket = require('./store/basket/basket.js')({
    stockroom: stockroom,
    onChange: function () {
        basketRender();
    }});


/*
 * 
 * @returns {undefined}
 */
function numberFormat(num) {
    return  parseFloat(num).toFixed(2);
}
/*
 * 
 */
function basketRender() {
    var total = currency.convert(basket.getTotal());
    $('.basket-items').html(basketTemplate({basket: basket, numberFormat: numberFormat}));
    $('.basket-total').html(currency.getSymbol() + numberFormat(total));
}
/*
 * 
 */
$(function () {
    /*
     * 
     */
    function findSku(el) {
        return $(el).closest('[data-stock-id]').attr('data-stock-id');
    }

    /*
     * 
     */
    $('body').on('change', '.js-currency', function () {
        currency.setCurrency($(this).val());
        basketRender();
    });

    /*
     * 
     */
    $('body').on('click', '.js-delete', function () {
        basket.remove(this);
    });

    /*
     * 
     */
    $('body').on('click', '.stock-add', function () {
        basket.addItem(findSku(this));
    });

    /*
     * 
     */
    $('body').on('click', '.stock-remove', function () {
        basket.removeItem(findSku(this));
    });
    /*
     * When currency data is loaded, render basket
     */
    currency.init(function () {
        var storeHtml = storeTemplate({
            currency: currency,
            stockItems: stockroom.getAllStock(),
            stockItemTemplate: stockItemTemplate});
        $('main').html(storeHtml);
    });

});


