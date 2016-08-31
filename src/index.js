"use strict";

/*
 * 
 */
$(function () {

    var format = require("util/format");
    var exchange = require("currency/exchange");
    var stockRoom = require("stock/stock_repository");
    var ShoppingBasket = require("basket/basket");
    var basket = new ShoppingBasket(stockRoom);

    var storeTemplate = require("templates/layout");
    var basketTemplate = require("templates/basket");
    var totalTemplate = require("templates/total");
    var stockTemplate = require("templates/stock");
    /*
     * Render the view
     */
    var storeHtml = storeTemplate({
        currencies: exchange.getCurrencies(),
        stockItems: stockRoom.findAll(),
        stockItemTemplate: stockTemplate});
    $('main').html(storeHtml);
    /**
     * 
     * @param {DOMNode} el
     * @returns {String}
     */
    function findSku(el) {
        return $(el).closest('[data-stock-id]').attr('data-stock-id')
    }
    /**
     * 
     */
    function renderBasket() {
        $('.basket-items').html(basketTemplate({basket: basket}))
        renderTotal()
    }
    /**
     *  
     */
    function renderTotal() {
        exchange.convert(basket.getTotal()).then(function (totalCost) {
            $('.basket-total').html(totalTemplate({
                totalCost: format.float(totalCost),
                symbol: exchange.getCurrencySymbol(),
                name: exchange.getCurrencyName()}))
        });
    }
    /**
     * 
     */
    $('body').on('change', '.js-currency', function () {
        exchange.setCurrency($(this).val())
        renderTotal()
    })

    /**
     * 
     */
    $('body').on('click', '.stock-add', function () {
        basket.addItemById(findSku(this))
        renderBasket()
    })

    /*
     * 
     */
    $('body').on('click', '.stock-remove', function () {
        basket.removeItemById(findSku(this))
        renderBasket()
    })

});


