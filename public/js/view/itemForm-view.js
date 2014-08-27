define(['backbone', 'resthub', 'hbs!template/itemForm', 'model/item', 'typeahead-bundle', 'backbone-validation'],
    function (Backbone, Resthub, itemFormTemplate, Item) {

        var ItemFormView = Resthub.View.extend({

            template: itemFormTemplate,
            events: {
                'click .cancel': 'cancel',
                'click .save': 'save'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function () {

                this.listenTo(this.model, 'invalid', this.invalid);
                this.listenTo(this.model, 'valid', this.valid);
                Backbone.Validation.bind(this);

                this.products = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    limit: 10,
                    remote: {
                        url: 'http://localhost:3000/products/product_name/like/%QUERY',
                        filter: function (list) {
                            return $.map(list, function (product) {
                                return { product_name: product.product_name, energy_100g: product.energy_100g };
                            });
                        }
                    }
                });

                this.products.initialize();

                this.render();

                $('#inputName').typeahead({
                    highlight: true,
                    minLength: 1
                }, {
                    name: 'products',
                    displayKey: function (product) {
                        return product.product_name;
                    },
                    source: this.products.ttAdapter()
                });

                $('#inputName').on('blur', $.proxy(this.validateTypeaheadSelection, this));
                $('#inputName').on('typeahead:selected', this.fillEnergyHundred);
            },

            validateTypeaheadSelection: function () {

                val = $('#inputName').val();
                self = this;

                // Check if the item exist
                // TODO Check that it is correcly working:
                // in case of ajax timeout?
                // disabled then enabled?
                Backbone.ajax({
                    url: "http://localhost:3000/products/product_name/equals/" + val,
                    data: "",
                    beforeSend: function () {
                        console.log("beforeSend");

                        $("body").prepend("<div class=\"overlay\"></div>");

                        $(".overlay").css({
                            "position": "absolute",
                            "width": $(document).width(),
                            "height": $(document).height(),
                            "z-index": 99999,
                        }).fadeTo(0, 0.8);
                        //$('#wait').show();
                    },
                    complete: function () {
                        console.log("complete");
                        $(".overlay").remove();
                        //$('#wait').hide();
                    },
                    success: function (val) {
                        console.log("success");

                        if (val != '') {
                            console.log("IN the list");
                        }
                        else {
                            console.log("NOT IN the list");
                            self.invalid(this.model, {name: "Product must exist"});
                            $('#inputName').val('');
                        }
                    },
                    error: function (val) {
                        $('#inputName').val('');
                    }
                });
            },

            fillEnergyHundred: function (obj, product, name) {
                $("#inputEnergy_100g").val(Math.ceil(product.energy_100g / 4.1868));
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
            },

            save: function () {

                this.populateModel("#newItemForm");

                if (this.model.isValid(true)) {
                    console.log('valid');
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
