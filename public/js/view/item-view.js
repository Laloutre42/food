define(['backbone', 'resthub', 'hbs!template/item'],
    function (Backbone, Resthub, itemTemplate) {

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

            edit: function() {
                var taskFormView = new TaskFormView({root: this.$el, model: this.model});
                taskFormView.render();
            },

            toggleDetails: function() {
                this.$('p').slideToggle();
            }

        });

        return ItemView;
    });
