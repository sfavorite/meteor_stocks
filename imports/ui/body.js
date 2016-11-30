import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';
import './stock.js';
import './stockDetail.js';

Template.body.events({
    "submit .add-stock": function(event) {
        event.preventDefault();

        var input = event.target.symbol;
        Meteor.call("addStock", input.value);
        input.value = "";
    },

    "click .fav-filter": function() {
        var oldValue = Session.get("filterFavorites") || false;
        Session.set("filterFavorites", !oldValue);
    }
});

Template.body.helpers({
    stocks: function () {
        var filter = Session.get("filterFavorites") || false;

        var find = filter ? {owner: Meteor.userId(), favorite: filter} :
            {owner: Meteor.userId()};
        console.log("Find: " + find);
        var data =  Stocks.find(find, {sort: ["symbol", "asc"]});

        return data;
        //return Stocks.find(find, {sort: ["symbol", "asc"]});
    },


    selectedStock: function() {
        return SelectedStock.get();
    }
});
