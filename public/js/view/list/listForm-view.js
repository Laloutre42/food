define(['backbone', 'resthub', 'hbs!template/list/listForm', 'model/list', 'backbone-validation'],
    function (Backbone, Resthub, listFormTemplate, List) {

        var ListFormView = Resthub.View.extend({

            template: listFormTemplate,
            root: '#modalListForm',
            events: {
                'click .cancel': 'cancel'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function (attributes) {

                this.eventEditMode = attributes.eventEditMode;

                this.render();
                this.validateForm();
            },
            cancel: function () {

                if (!this.eventEditMode) {
                    this.model.trigger('destroy');
                }
            },

            save: function () {
                this.populateModel("#newListForm");

                // Set author name
                this.model.set("author", "Arnaud");

                this.model.save();
                this.removeBackGroundModel();
                return false;
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
            },


            validateForm: function () {
                self = this;
                $('#newListForm').bootstrapValidator({
                    excluded: [':disabled'],
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        name: {
                            validators: {
                                notEmpty: {
                                    message: 'The name is required and cannot be empty'
                                },
                                stringLength: {
                                    max: 250,
                                    message: 'The name must be less than 250 characters long'
                                }
                            }
                        }
                    }
                })
                    .on('success.form.bv', function (e) {
                        // Prevent form submission
                        e.preventDefault();

                        self.save();
                    });
            }

        });

        return ListFormView;
    });
