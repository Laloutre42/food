define(['backbone', 'resthub', 'hbs!template/item', 'view/itemForm-view'],
    function (Backbone, Resthub, itemTemplate, ItemFormView) {

        var ItemView = Resthub.View.extend({

            root: '#tableItems',
            strategy: 'append',
            tagName: 'tr',

            template: itemTemplate,
            events: {
//                'typeahead #bloodhound .typeahead': 'addTrace'
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
                $('#tableItems').editableTableWidget();
                return this;
            },

            edit: function() {
                var itemFormView = new ItemFormView({root: this.$el, model: this.model});
                itemFormView.render();
            },

        });

        return ItemView;
    });
