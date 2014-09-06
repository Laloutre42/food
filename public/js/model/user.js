define(['backbone'],
    function (Backbone) {

        var User = Backbone.Model.extend({

            urlRoot: '/user',

            idAttribute: '_id',

            defaults: {
                id: 0,
                email: '',
                password: ''
            }
        });

        return User;

    });
