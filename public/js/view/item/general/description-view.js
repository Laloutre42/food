define(['backbone', 'resthub', 'hbs!template/item/general/description', 'model/list'],
    function (Backbone, Resthub, descriptionTemplate, List) {

        var DescriptionView = Resthub.View.extend({

            root: '#generalItem',

            template: descriptionTemplate,
            events: {
            },

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                // Events aggregator object
                this.vent = attributes.vent;
                this.listId = attributes.listId;

                this.model = new List();
                this.model.fetch({
                    url: '/lists/' + this.listId,
                    success: $.proxy(this.render, this)
                })
            },

            render: function() {
                DescriptionView.__super__.render.apply(this);
                return this;
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return DescriptionView;
    });
