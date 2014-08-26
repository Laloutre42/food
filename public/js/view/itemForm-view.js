define(['backbone', 'resthub', 'hbs!template/itemForm', 'model/item', 'typeahead-bundle', 'backbone-validation'],
    function (Backbone, Resthub, itemFormTemplate, Item) {

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

//                this.products = new Bloodhound({
//                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
//                    queryTokenizer: Bloodhound.tokenizers.whitespace,
//                    limit: 10,
//                    remote: {
//                        url: 'http://localhost:3000/products/product_name/%QUERY',
//                        filter: function (list) {
//                            return $.map(list, function (product) {
//                                return { value: product.product_name };
//                            });
//                        }
//                    }
//                });
//
//                this.products.initialize();
//
                this.render();
//
//                $('.typeahead').typeahead(null, obj = {
//                    name: 'products',
//                    displayKey: 'value',
//                    source: this.products.ttAdapter()
//                });
            },

            save: function() {

                newModel = new Item();
                Backbone.Validation.bind(newModel);
                
                var success = newModel.set({
                    name: this.$('#inputName').val(),
                    category: this.$('#inputCategory').val(),
                    energy_100g: this.$('#inputEnergy_100g').val(),
                    weight: this.$('#inputWeight').val()
                }, {validate: true});

                if(newModel.isValid(true)){
                    alert( 'valid' );
                }

                if(!newModel.validationError){
                    alert( 'valid with ' );
                }

//                this.model.save({
//                    name: this.$('#inputName').val(),
//                    category: this.$('#inputCategory').val(),
//                    energy_100g: this.$('#inputEnergy_100g').val(),
//                    weight: this.$('#inputWeight').val()
//                });
//                this.removeBackGroundModel();
//                return false;
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
