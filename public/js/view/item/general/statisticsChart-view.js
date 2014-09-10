define(['backbone', 'resthub', 'hbs!template/item/general/statisticsChart'],
    function (Backbone, Resthub, statisticsChartTemplate) {

        var StatisticsChartView = Resthub.View.extend({

            root: '#generalItem',

            template: statisticsChartTemplate,
            events: {
            },

            chart: null,

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;

                _.bindAll(this, "displayTotal");
                this.vent.on("displayTotal", this.displayTotal);
            },

            render: function () {
                StatisticsChartView.__super__.render.apply(this);

                this.initializeChart();

                return this;
            },

            close: function () {
                this.remove();
                this.unbind();
            },

            initializeChart: function () {

                this.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'statisticsChartContainer',
                        type: 'bar'
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        categories: ['Breakfast', 'Lunch', 'Diner', 'Snack', 'All'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: null
                        }
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true,
                        reversed: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Total weight (g)',
                        data: []
                    }, {
                        name: 'Total energy (kcal)',
                        data: []
                    }, {
                        name: 'Average kcal/100g',
                        data: []
                    }]
                });
            },

            displayTotal: function (total) {

                // Total weight (g)
                var totalWeight = [
                    parseFloat(total.totalBreakfast.totalWeigh.toFixed(2)),
                    parseFloat(total.totalLunch.totalWeigh.toFixed(2)),
                    parseFloat(total.totalDiner.totalWeigh.toFixed(2)),
                    parseFloat(total.totalSnack.totalWeigh.toFixed(2)),
                    parseFloat(total.totalAll.totalWeigh.toFixed(2))
                ]
                this.chart.series[0].setData(totalWeight);

                // Total energy (kcal)
                var totalEnergy = [
                    parseFloat(total.totalBreakfast.totalEnergy.toFixed(2)),
                    parseFloat(total.totalLunch.totalEnergy.toFixed(2)),
                    parseFloat(total.totalDiner.totalEnergy.toFixed(2)),
                    parseFloat(total.totalSnack.totalEnergy.toFixed(2)),
                    parseFloat(total.totalAll.totalEnergy.toFixed(2))
                ]
                this.chart.series[1].setData(totalEnergy);

                // Average kcal/100g
                var averageEnergy = [
                    parseFloat(total.totalBreakfast.averagelEnergy100g.toFixed(2)),
                    parseFloat(total.totalLunch.averagelEnergy100g.toFixed(2)),
                    parseFloat(total.totalDiner.averagelEnergy100g.toFixed(2)),
                    parseFloat(total.totalSnack.averagelEnergy100g.toFixed(2)),
                    parseFloat(total.totalAll.averagelEnergy100g.toFixed(2))
                ]
                this.chart.series[2].setData(averageEnergy);

            }

        });

        return StatisticsChartView;
    });
