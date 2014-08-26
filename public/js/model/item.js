define(['backbone'],
    function(Backbone) {

    var Item = Backbone.Model.extend({
        validation: {
            name: {
                required: true,
                msg: 'Item name is required.'
            },
            category: {
                required: true,
                msg: 'Item category is required.'
            },
            energy_100g: {
                //required: true,
                msg: 'Item energy_100g is required.'
            },
            weight: {
                required: true,
                range: [1, 80],
                msg: 'Item weight is required.'
            }
        }
    });

    return Item;

});
