define(['backbone'],
    function (Backbone) {

        var Item = Backbone.Model.extend({

            idAttribute: '_id',

            validation: {

                name: {
                    required: true
                },

                category: {
                    required: true
                },
                energy_100g: {
                    pattern: 'number'
                },
                weight: {
                    pattern: 'number'
                }
            }
        });

        return Item;

    });
