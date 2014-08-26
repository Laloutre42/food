define(['backbone', 'resthub', 'hbs!template/items', 'view/item-view', 'model/item', 'datatables', 'datatables-bootstrap', 'editabletable'],
    function (Backbone, Resthub, itemsTemplate, ItemView, Item) {

        var ItemsView = Resthub.View.extend({

            root: '#itemsContainer',
            template: itemsTemplate,
            events: {
                'click #create': 'create'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function () {

                this.render();
                this.listenTo(this.collection, 'add', this.add, this);
                this.collection.fetch();
            },

            render: function() {
                ItemsView.__super__.render.apply(this);
                this.collection.forEach(this.add, this);
                return this;
            },

            add: function(item) {
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
