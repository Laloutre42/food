define(['backbone'],
    function (Backbone) {

        var List = Backbone.Model.extend({

            idAttribute: '_id',

            validation: {

                name: {
                    required: true
                },

                author: {
                    required: true
                }
            }
        });

        return List;

    });
