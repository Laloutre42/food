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
                        // url points to a json file that contains an array of country names, see
                        // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
                        url: 'http://localhost:3000/products/product_name/%QUERY',
//                        url: '../../data/countries.json',
                        // the json file contains an array of strings, but the Bloodhound
                        // suggestion engine expects JavaScript objects so this converts all of
                        // those strings
                        filter: function (list) {
                            return $.map(list, function (product) {
                                return { value: product.product_name };
                            });
                        }
                    }
                });

                // kicks off the loading/processing of `local` and `prefetch`
                this.products.initialize();

                this.render();

                $('#bloodhound .typeahead').typeahead(null, obj = {
                    name: 'products',
                    displayKey: 'value',
                    // `ttAdapter` wraps the suggestion engine in an adapter that
                    // is compatible with the typeahead jQuery plugin
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
