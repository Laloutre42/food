define(['backbone'],
    function(Backbone) {

        var Product = Backbone.Model.extend({

            defaults: {
                energy_100g_kcal: undefined
            },

            initialize: function(){
                this.energy_100g_kcal();
            },

            energy_100g_kcal: function(){
                this.set('energy_100g_kcal', Math.ceil(this.get('energy_100g')/4.184));
            }

        });

        return Product;

    });
