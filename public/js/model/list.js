define(['backbone'],
    function (Backbone) {

        var List = Backbone.Model.extend({
            idAttribute: '_id'
        });

        return List;

    });
