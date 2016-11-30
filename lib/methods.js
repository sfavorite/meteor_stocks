Meteor.methods({
    addStock: function(symbol) {
        console.log('Add stock');
        if(!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        symbol = symbol.toUpperCase();

        console.log('Checking for duplicates');
        // Don't allow duplicates
        if (Stocks.findOne({symbol: symbol, owner: Meteor.userId()})) {
            console.log('Already in collection');
            return;
        }

        if(Meteor.isServer) {
            Meteor.call("getName", symbol, function(error, result) {
                if(result !== undefined) {
                    Stocks.insert( {
                        symbol: symbol,
                        name: result,
                        owner: Meteor.userId()
                    });
                }
            });
        }
    },

    removeStock: function(stockId) {
        Stocks.remove(stockId);
    },

    setFavorite: function(stockId, favorite) {
        Stocks.update(stockId, {$set: {favorite: favorite}});
    }
});
