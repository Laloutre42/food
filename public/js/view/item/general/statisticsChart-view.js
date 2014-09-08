define(['backbone', 'resthub', 'hbs!template/item/general/statisticsChart'],
    function (Backbone, Resthub, statisticsChartTemplate) {

        var StatisticsChartView = Resthub.View.extend({

            root: '#generalItem',

            template: statisticsChartTemplate,
            events: {
            },

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;
            },

            render: function() {
                StatisticsChartView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return StatisticsChartView;
    });
