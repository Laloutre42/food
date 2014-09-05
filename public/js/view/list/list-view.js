define(['backbone', 'resthub', 'hbs!template/list/list', 'view/list/listForm-view'],
    function (Backbone, Resthub, listTemplate, ListFormView) {

        var ListView = Resthub.View.extend({

            root: '#tableLists',
            strategy: 'append',
            tagName: 'tr',

            template: listTemplate,
            events: {
                'click .editOrDeleteList .edit': 'editList',
                'click .editOrDeleteList .remove': 'removeList'
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
                ListView.__super__.render.apply(this);
                return this;
            },

            editList: function(eventEditMode) {
                listFormView = new ListFormView({model: this.model, eventEditMode: eventEditMode});
            },

            removeList: function() {
                this.model.destroy();
                this.model.trigger('destroy');
            },

            syncModel: function(){
                this.vent.trigger("addListViewEvent", this);
            },
            destroyModel: function(){
                this.close();
            },
            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return ListView;
    });
