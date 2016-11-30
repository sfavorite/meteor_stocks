Meteor.methods({
    getName: function(sym) {
        var data = YahooFinance.snapshot({
            symbols: [sym],
            fields: ['n']
        });
        console.log(data);
        return data[0].name;
    },

    getData: function(symbol) {
        var end = new Date();
        console.log('End: ' + end);
        var start = new Date(end);
        start.setDate(start.getDate() - 365);
        console.log('Start: ' + start);

        return YahooFinance.historical({
            symbol: symbol,
            from: start,
            to: end
        });
    }
})
