define(['backbone', 'resthub', 'hbs!template/item/general/statisticsTable'],
    function (Backbone, Resthub, statisticsTableTemplate) {

        var StatisticsTableView = Resthub.View.extend({

            root: '#generalItem',

            template: statisticsTableTemplate,
            events: {
            },

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;

                _.bindAll(this, "computeTotal");
                this.vent.on("computeTotal", this.computeTotal);
            },

            render: function () {
                StatisticsTableView.__super__.render.apply(this);
                return this;
            },

            close: function () {
                this.remove();
                this.unbind();
            },

            computeTotal: function () {

                var total = new Total();
                var category = "";

                $('#tableItems > tbody >  tr').each(function () {

                    element = $(this);
                    category = element.find('.category').text();
                    weight = parseFloat(element.find('.weight').text());
                    energy = parseFloat(element.find('.energy').text());
                    energy_100g = parseFloat(element.find('.energy_100g').text());

                    total.incrementCategory(weight, energy, energy_100g, category);
                });

                $('#breakfastTotalWeight').text(parseFloat(total.totalBreakfast.totalWeigh.toFixed(2)));
                $('#breakfastTotalEnergy').text(parseFloat(total.totalBreakfast.totalEnergy.toFixed(2)));
                $('#breakfastAverageEnergy100g').text(parseFloat(total.totalBreakfast.averagelEnergy100g.toFixed(2)));

                $('#lunchTotalWeight').text(parseFloat(total.totalLunch.totalWeigh.toFixed(2)));
                $('#lunchTotalEnergy').text(parseFloat(total.totalLunch.totalEnergy.toFixed(2)));
                $('#lunchAverageEnergy100g').text(parseFloat(total.totalLunch.averagelEnergy100g.toFixed(2)));

                $('#dinerTotalWeight').text(parseFloat(total.totalDiner.totalWeigh.toFixed(2)));
                $('#dinerTotalEnergy').text(parseFloat(total.totalDiner.totalEnergy.toFixed(2)));
                $('#dinerAverageEnergy100g').text(parseFloat(total.totalDiner.averagelEnergy100g.toFixed(2)));

                $('#snackTotalWeight').text(parseFloat(total.totalSnack.totalWeigh.toFixed(2)));
                $('#snackTotalEnergy').text(parseFloat(total.totalSnack.totalEnergy.toFixed(2)));
                $('#snackAverageEnergy100g').text(parseFloat(total.totalSnack.averagelEnergy100g.toFixed(2)));

                $('#allTotalWeight').text(parseFloat(total.totalAll.totalWeigh.toFixed(2)));
                $('#allTotalEnergy').text(parseFloat(total.totalAll.totalEnergy.toFixed(2)));
                $('#allAverageEnergy100g').text(parseFloat(total.totalAll.averagelEnergy100g.toFixed(2)));
            }

        });

        return StatisticsTableView;
    });
