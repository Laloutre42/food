define(['backbone', 'resthub', 'hbs!template/item/item', 'view/item/itemForm-view', 'collection/products'],
    function (Backbone, Resthub, itemTemplate, ItemFormView, Products) {

        var ItemView = Resthub.View.extend({

            root: '#tableItems',
            strategy: 'append',
            tagName: 'tr',

            template: itemTemplate,
            events: {
                'click .editOrDeleteItem .edit': 'editItem',
                'click .editOrDeleteItem .remove': 'removeItem'
            },

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;

                this.listenTo(this.model, 'sync', this.syncModel);
                this.listenTo(this.model, 'destroy', this.destroyModel);
            },

            render: function() {
                ItemView.__super__.render.apply(this);
                return this;
            },

            editItem: function(eventEditMode) {
                itemFormView = new ItemFormView({model: this.model, collection: new Products(), eventEditMode: eventEditMode});
            },

            removeItem: function() {
                this.model.destroy();
                this.model.trigger('destroy');
            },

            syncModel: function(){
                this.vent.trigger("addItemViewEvent", this);
                this.vent.trigger("computeTotal");
            },
            destroyModel: function(){
                this.close();
                this.vent.trigger("computeTotal");
            },
            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return ItemView;
    });
