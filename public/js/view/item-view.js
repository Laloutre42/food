define(['backbone', 'resthub', 'hbs!template/item', 'view/itemForm-view', 'collection/products'],
    function (Backbone, Resthub, itemTemplate, ItemFormView, Products) {

        var ItemView = Resthub.View.extend({

            root: '#tableItems',
            strategy: 'append',
            tagName: 'tr',

            template: itemTemplate,
            events: {
                'click .editOrDelete .edit': 'editItem',
                'click .editOrDelete .remove': 'removeItem'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function () {

                this.listenTo(this.model, 'sync', this.render);
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },

            render: function() {
                ItemView.__super__.render.apply(this);
                return this;
            },

            editItem: function(eventEditMode) {
                itemFormView = new ItemFormView({model: this.model, collection: new Products(), eventEditMode: eventEditMode});
            }

        });

        return ItemView;
    });
