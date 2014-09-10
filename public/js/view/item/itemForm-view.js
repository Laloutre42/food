define(['backbone', 'resthub', 'hbs!template/item/itemForm', 'model/item',
        'view/product/productResult-view',
        'collection/products',
        'model/product',
        'backbone-validation'],
    function (Backbone, Resthub, itemFormTemplate, Item, ProductResultView, Products, Product) {

        var ItemFormView = Resthub.View.extend({

            template: itemFormTemplate,
            root: '#modalItemForm',
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

                var productResultView = new ProductResultView({collection: new Products()});
                productResultView.render();

                $('#searchProductForm').on('submit',function(event){
                    event.preventDefault() ;
                });
            },

            cancel: function () {

                if (!this.eventEditMode) {
                    this.model.trigger('destroy');
                }
            },

            save: function () {
                this.populateModel("#newItemForm");

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
                $('#newItemModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            },

            validateForm: function () {
                self = this;
                this.bootstrapValidator = $('#newItemForm').bootstrapValidator({
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
                                }
                            }
                        },

                        energy_100g: {
                            validators: {
                                notEmpty: {
                                    message: 'The energy_100g is required and cannot be empty'
                                },
                                integer: {
                                    message: 'The energy_100g is not valid'
                                }
                            }
                        },

                        weight: {
                            validators: {
                                notEmpty: {
                                    message: 'The weight is required and cannot be empty'
                                },
                                integer: {
                                    message: 'The weight is not valid'
                                }
                            }
                        },

                        category: {
                            validators: {
                                notEmpty: {
                                    message: 'The category is required and cannot be empty'
                                },
                                regexp: {
                                    regexp: /^(Breakfast|Lunch|Diner|Snack)$/i,
                                    message: 'The category is not valid'
                                }
                            }
                        }
                    }
                }).on('success.form.bv', function (e) {
                    // Prevent form submission
                    e.preventDefault();

                    self.save();
                });
            }

        });

        return ItemFormView;
    });
