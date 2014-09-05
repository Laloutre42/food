define(['backbone'],
    function (Backbone) {

        var User = Backbone.Model.extend({

            urlRoot: '/user',

            idAttribute: '_id',

            validation: {

                name: {
                    required: true
                },
                email: {
                    required: true
                }
            }
        });

        return User;

    });
