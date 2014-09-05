define(['backbone'],
    function (Backbone) {

        var Item = Backbone.Model.extend({

            idAttribute: '_id',

            validation: {

                name: {
                    required: true
                },

                category: {
                    oneOf: ['Breakfast', 'Lunch', 'Diner', 'Snack']
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
