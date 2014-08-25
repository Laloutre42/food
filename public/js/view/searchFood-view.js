define(['backbone', 'resthub', 'hbs!template/searchFood', 'typeahead', 'bloodhound'],
    function (Backbone, Resthub, searchFoodTemplate, Typeahead, Bloodhound) {

        var SearchFoodView = Resthub.View.extend({

            /**
             * Template
             */
            template: searchFoodTemplate,

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

                this.products = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    limit: 10,
                    remote: {
                        url: 'http://localhost:3000/products/product_name/%QUERY',
                        filter: function (list) {
                            return $.map(list, function (product) {
                                return { value: product.product_name };
                            });
                        }
                    }
                });

                this.products.initialize();

                this.render();

                $('#bloodhound .typeahead').typeahead(null, obj = {
                    name: 'products',
                    displayKey: 'value',
                    source: this.products.ttAdapter()
                });

            },


            /**
             * TODO
             * @param event
             */
            addTrace: function (event) {
                console.log("ok");
            }

        });

        return SearchFoodView;
    });
