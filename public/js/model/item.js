define(['backbone'],
    function (Backbone) {

        var Item = Backbone.Model.extend({
            idAttribute: '_id',
        });

        return Item;

    });
