define(['backbone', 'resthub', 'hbs!template/items', 'view/item-view', 'datatables', 'datatables-bootstrap', 'editabletable'],
    function (Backbone, Resthub, itemsTemplate, ItemView, Datatables, DatatablesBootstrap, Editabletable) {

        var ItemsView = Resthub.View.extend({

            root: '#itemsContainer',
            template: itemsTemplate,
            events: {
//                'typeahead #bloo  dhound .typeahead': 'addTrace'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function () {

                this.render();
                //$('#tableItems').editableTableWidget();
                //this.listenTo(this.collection, 'add', this.add, this);
                this.collection.on('add', this.add, this);
                this.collection.fetch({remove: false});
                //this.collection.add([{"name":"Test","category":"Snack","energy_100g":50,"weight":10,"energy":5,"_id":"53fc57a67e4683e42bb2f5e6","__v":0}]);
                console.log("fetch");
            },

            render: function() {
                console.log("render");
                ItemsView.__super__.render.apply(this);
                this.collection.forEach(this.add, this);
                return this;
            },

            add: function(item) {
                console.log("add");
                var itemView = new ItemView({model: item});
                itemView.render();
            },

            create: function() {
                var item = new Item();
                // Silent cause we do not want to render but to be in edit mode
                this.collection.add(item, {silent: true});
                var itemView = new ItemView({model: item});
                itemView.edit();
            }

        });

        return ItemsView;
    });
