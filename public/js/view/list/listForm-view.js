define(['backbone', 'resthub', 'hbs!template/list/listForm', 'model/list', 'backbone-validation'],
    function (Backbone, Resthub, listFormTemplate, List) {

        var ListFormView = Resthub.View.extend({

            template: listFormTemplate,
            root: '#modalListForm',
            events: {
                'click .cancel': 'cancel',
                'click .save': 'save',
                'focus #inputListName': 'hideErrors'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function (attributes) {

                this.eventEditMode = attributes.eventEditMode;

                this.listenTo(this.model, 'invalid', this.invalid);
                //this.listenTo(this.model, 'valid', this.valid);

                Backbone.Validation.bind(this);

                this.render();
            },

            hideErrors: function () {
                this.$('.form-group').removeClass('has-error');
                this.$('.form-group .tooltip').hide();
            },

            invalid: function (model, errors) {
                this.hideErrors();
                _.each(errors, function (value, key, list) {

                    control = this.$("input[name='" + key + "']");
                    form = control.parents(".form-group");
                    form.addClass("has-error");

                    position = control.data("tooltip-position") || "top";
                    control.tooltip({
                        placement: position,
                        trigger: "manual",
                        title: value
                    });
                    control.tooltip("show");

                }, this);
            },

            cancel: function () {
                this.hideErrors();

                if (!this.eventEditMode) {
                    this.model.trigger('destroy');
                }
            },

            save: function () {
                this.populateModel("#newListForm");

                // Set author name
                this.model.set("author", "Arnaud");

                if (this.model.isValid()) {
                    this.model.save();
                    this.removeBackGroundModel();
                    return false;
                }
            },

            delete: function () {
                this.model.destroy();
                this.removeBackGroundModel();
                return false;
            },

            removeBackGroundModel: function () {
                $('#newListModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }

        });

        return ListFormView;
    });
