define(['backbone', 'resthub', 'hbs!template/item/itemForm', 'model/item', 'view/product-view', 'model/product', 'backbone-validation'],
    function (Backbone, Resthub, itemFormTemplate, Item, ProductView, Product) {

        var ItemFormView = Resthub.View.extend({

            template: itemFormTemplate,
            root: '#modalItemForm',
            events: {
                'click .cancel': 'cancel',
                'click .save': 'save',
                'click #searchProduct': 'searchProduct',
                'keypress #inputSearchProduct': 'searchProductEnterKey',
                'click #tableProducts tr': 'productChoosen',
                'focus #inputItemName': 'hideErrors',
                'focus #inputItemEnergy_100g': 'hideErrors',
                'focus #inputItemWeight': 'hideErrors',
                'focus #searchProduct': 'hideErrors'
            },

            childViews: [],

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
                this.listenTo(this.collection, 'add', this.add, this);
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
            },

            collectionFetchedSuccess: function (collection, response, options) {
                console.log(collection.count + " items found. Display " + collection.length);
                if (collection.count > 0){
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

                this.populateModel("#newItemForm");

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
                $('#newItemModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }

        });

        return ItemFormView;
    });
