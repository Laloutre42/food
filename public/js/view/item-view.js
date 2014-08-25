define(['backbone', 'resthub', 'hbs!template/item', 'jquery-dataTables', 'dataTables-bootstrap'],
    function (Backbone, Resthub, itemTemplate, JqueryDataTables, DataTablesBootstrap) {

        var ItemView = Resthub.View.extend({

            /**
             * Template
             */
            template: itemTemplate,

            /**
             * Events
             */
            events: {
//                'typeahead #bloodhound .typeahead': 'addTrace'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;

                this.render();

            },


            /**
             * TODO
             * @param event
             */
            addTrace: function (event) {
                console.log("ok");
            }

        });

        return ItemView;
    });
