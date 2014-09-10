define(['backbone', 'resthub', 'hbs!template/item/general/statisticsChartPie'],
    function (Backbone, Resthub, statisticsChartPieTemplate) {

        var StatisticsChartView = Resthub.View.extend({

            root: '#generalItem',

            template: statisticsChartPieTemplate,
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
                        renderTo: 'statisticsChartPieContainer',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: "Total weight / Total energy"
                    },
                    tooltip: {
                        pointFormat: '{series.name}: {point.y} (<b>{point.percentage:.1f}%</b>)'
                    },
                    legend: {
                        enabled: true
                    },
                    plotOptions: {
                        pie: {
                            size: "100%",
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [
                        {
                            type: 'pie',
                            name: 'Total weight (g)',
                            center: ["25%", "50%"],
                            showInLegend: true,
                            data: []
                        },
                        {
                            type: 'pie',
                            name: 'Total energy (kcal)',
                            center: ["75%", "50%"],
                            showInLegend: false,
                            data: []
                        }
                    ]
                });
            },

            displayTotal: function (total) {

                // Total weight (g)
                var totalWeight = [
                    {
                        name: 'Breakfast',
                        y: parseFloat(total.totalBreakfast.totalWeigh.toFixed(2))
                    },
                    {
                        name: 'Lunch',
                        y: parseFloat(total.totalLunch.totalWeigh.toFixed(2))
                    },
                    {
                        name: 'Diner',
                        y: parseFloat(total.totalDiner.totalWeigh.toFixed(2))
                    },
                    {
                        name: 'Snack',
                        y: parseFloat(total.totalSnack.totalWeigh.toFixed(2))
                    }
                ]
                this.chart.series[0].setData(totalWeight);

                // Total energy (kcal)
                var totalEnergy = [
                    {
                        name: 'Breakfast',
                        y: parseFloat(total.totalBreakfast.totalEnergy.toFixed(2))
                    },
                    {
                        name: 'Lunch',
                        y: parseFloat(total.totalLunch.totalEnergy.toFixed(2))
                    },
                    {
                        name: 'Diner',
                        y: parseFloat(total.totalDiner.totalEnergy.toFixed(2))
                    },
                    {
                        name: 'Snack',
                        y: parseFloat(total.totalSnack.totalEnergy.toFixed(2))
                    }
                ]
                this.chart.series[1].setData(totalEnergy);
//
//                // Average kcal/100g
//                var averageEnergy = [
//                    parseFloat(total.totalBreakfast.averagelEnergy100g.toFixed(2)),
//                    parseFloat(total.totalLunch.averagelEnergy100g.toFixed(2)),
//                    parseFloat(total.totalDiner.averagelEnergy100g.toFixed(2)),
//                    parseFloat(total.totalSnack.averagelEnergy100g.toFixed(2)),
//                    parseFloat(total.totalAll.averagelEnergy100g.toFixed(2))
//                ]
//                this.chart.series[2].setData(averageEnergy);

            }

        });

        return StatisticsChartView;
    });
