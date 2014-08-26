define(['backbone', 'resthub', 'hbs!template/itemForm', 'backbone-validation'],
    function (Backbone, Resthub, itemFormTemplate) {

        var ItemFormView = Resthub.View.extend({

            template: itemFormTemplate,
            events: {
                'click .save': 'save'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function() {
                Backbone.Validation.bind(this);
            },

            save: function() {
                this.model.save({
                    title: this.$('.title-field').val(),
                    description: this.$('.desc-field').val()
                });
                this.removeBackGroundModel();
                return false;
            },

            delete: function() {
                this.model.destroy();
                this.removeBackGroundModel();
                return false;
            },

            removeBackGroundModel: function(){
                $('#newItemModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }

        });

        return ItemFormView;
    });
