define(['backbone',
        'bootstrap',
        'view/home/home-view',
        'view/authentification/login-view',
        'view/authentification/signUp-view',
        'view/authentification/profile-view',
        'view/item/items-view',
        'view/nav/topNavigation-view',
        'view/list/lists-view',
        'collection/items',
        'collection/lists'],
    function (Backbone, Bootstrap, HomeView, LoginView, SignUpView, ProfileView, ItemsView, TopNavigationView, ListsView, Items, Lists) {

        var AppRouter = Backbone.Router.extend({

            initialize: function (session) {
                this.session = session;
            },

            routes: {
                '': 'home',
                'denied': 'denied',
                'logout': 'logout',
                'login': 'login',
                'signUp': 'signUp',
                'profile': 'profile',
                'getLists': 'getLists',
                'getItems/:listId': 'getItems'
            },

            home: function () {

                // This general object is used for event aggregator between views
                this.vent = _.extend({}, Backbone.Events);

                new TopNavigationView({ vent: this.vent, session: this.session});
                new HomeView({ vent: this.vent});
            },

            denied: function () {
                new HomeView({ vent: this.vent, message: "Access denied"});
            },

            logout: function () {
                new HomeView({ vent: this.vent, message: "Log out successful"});
            },

            login: function () {
                new LoginView({ vent: this.vent, session: this.session});
            },

            signUp: function () {
                new SignUpView({ vent: this.vent, session: this.session});
            },

            profile: function () {
                new ProfileView({ vent: this.vent});
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