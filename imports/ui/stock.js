import './stock.html';

Template.stock.events({
    "click .toggle-favorite": function() {
        Meteor.call("setFavorite", this._id, !this.favorite);
    },

    "click .delete": function() {
        Meteor.call("removeStock", this._id);
    },

    "click .stockListing": function() {
        var name = this.name;
        var symbol = this.symbol;
        Meteor.call("getData", this.symbol, function(error, result) {
            if (result.length > 0) {
                var currentPrice = result[result.length-1].close.toFixed(2);

                SelectedStock.set({
                    name: name,
                    symbol: symbol,
                    data: result,
                    price: currentPrice
                });
            } else {
                console.log('No data for this stock');
            }
        });
    }



});

Template.stock.helpers({
    count: function() {
        return Stocks.find({symbol: this.symbol}).count();
    }
});
