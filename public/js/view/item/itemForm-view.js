define(['backbone', 'resthub', 'hbs!template/item/itemForm', 'model/item', '../product/product-view', 'model/product', 'backbone-validation'],
    function (Backbone, Resthub, itemFormTemplate, Item, ProductView, Product) {

        var ItemFormView = Resthub.View.extend({

            template: itemFormTemplate,
            root: '#modalItemForm',
            events: {
                'click .cancel': 'cancel',
                'click #searchProduct': 'searchProduct',
                'keypress #inputSearchProduct': 'searchProductEnterKey',
                'click #tableProducts tr': 'productChoosen'
            },

            childViews: [],

            /**
             * Initialize
             * @param options
             */
            initialize: function (attributes) {

                this.eventEditMode = attributes.eventEditMode;

                this.render();
                this.validateForm();

                this.listenTo(this.collection, 'add', this.add, this);

                $('#searchProductForm').on('submit',function(event){
                    event.preventDefault() ;
                });
            },

            add: function (product) {
                productView = new ProductView({model: product});
                this.childViews.push(productView);
                productView.render();
            },

            searchProductEnterKey: function (e) {

                // ENTER
                if (e.keyCode == 13) {
                    this.searchProduct();
                }
            },

            searchProduct: function () {
                $("#tableProducts").addClass('hidden');
                this.collection.product_name = $('#inputSearchProduct').val();
                this.removeChildrenViews();
                this.collection.reset();
                this.collection.fetch({success: this.collectionFetchedSuccess});
            },

            productChoosen: function (e) {
                $('#inputItemName').val($(e.currentTarget.children[0]).text());
                $('#inputItemEnergy_100g').val($(e.currentTarget.children[1]).text());
                $('#newItemForm').bootstrapValidator('revalidateField', 'name');
                $('#newItemForm').bootstrapValidator('revalidateField', 'energy_100g');
            },

            collectionFetchedSuccess: function (collection, response, options) {
                console.log(collection.count + " items found. Display " + collection.length);
                if (collection.count > 0) {
                    $("#tableProducts").removeClass('hidden');
                }
            },

            removeChildrenViews: function () {
                // handle other unbinding needs, here
                _.each(this.childViews, function (childView) {
                    if (childView.close) {
                        childView.close();
                    }
                })
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
