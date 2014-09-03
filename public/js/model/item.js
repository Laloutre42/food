define(['backbone'],
    function (Backbone) {

        var Item = Backbone.Model.extend({

            idAttribute: '_id',

            validation: {

                name: {
                    required: true
                },

                category: {
                    oneOf: ['BREAKFAST', 'LUNCH', 'DINER', 'SNACK']
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
