define(['backbone',
        'bootstrap',
        'view/home/home-view',
        'view/authentification/login-view',
        'view/authentification/signUp-view',
        'view/item/items-view',
        'view/nav/topNavigation-view',
        'view/list/lists-view',
        'collection/items',
        'collection/lists'],
    function (Backbone, Bootstrap, HomeView, LoginView, SignUpView, ItemsView, TopNavigationView, ListsView, Items, Lists) {

        var AppRouter = Backbone.Router.extend({

            initialize: function () {

                // Start Backbone history
                Backbone.history.start({ pushState: true, root: "/" });
            },

            routes: {
                '': 'home',
                'login': 'login',
                'signUp': 'signUp',
                'getLists': 'getLists',
                'getItems/:listId': 'getItems'
            },

            home: function () {

                // This general object is used for event aggregator between views
                this.vent = _.extend({}, Backbone.Events);

                new TopNavigationView({ vent: this.vent});
                new HomeView({ vent: this.vent});
            },

            login: function () {
                new LoginView({ vent: this.vent});
            },

            signUp: function () {
                new SignUpView({ vent: this.vent});
            },

            getLists: function () {
                new ListsView({ collection: new Lists(), vent: this.vent});
            },

            getItems: function (listId) {
                new ItemsView({ listId: listId, collection: new Items([], { id: listId }), vent: this.vent});

            }


        });

        return AppRouter;

    });