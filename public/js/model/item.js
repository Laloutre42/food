define(['backbone'],
    function (Backbone) {

        var Item = Backbone.Model.extend({
            validation: {

                name: {
                    required: true
                },

                category: {
                    range: [1, 4]
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
