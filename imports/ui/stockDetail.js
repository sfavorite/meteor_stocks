import './stockDetail.html';


SelectedStock = new ReactiveVar(null);

function createChart() {
    var stock = SelectedStock.get();
    console.log(stock);
    $('#container-area').highcharts('StockChart', {
       series: [{
         type: 'line',
         name: 'Close',
         data: stock.data.map(function(item){
           return {
             x: item.date,
             y: item.close
           };
         }),
         tooltip: {
           valueDecimals: 2
         }
       }]
   });
};

Template.stockDetail.rendered = function() {
 Tracker.autorun(function () {
   createChart();
 });
};
