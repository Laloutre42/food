define(['backbone', 'resthub', 'hbs!template/products', 'view/product-view', 'model/product'],
    function (Backbone, Resthub, productsTemplate, ProductView, Product) {

        var ProductsView = Resthub.View.extend({

            root: '#productsContainer',
            template: productsTemplate,
            events: {
                'click #searchProduct': 'searchProduct',
                'keypress #inputSearchProduct': 'searchProductEnterKey',
                'click #tableProducts tr': 'productChoosen'
            },

            /**
             * Initialize
             * @param options
             */
            initialize: function () {

                this.childViews = [];
                this.render();
                this.listenTo(this.collection, 'add', this.add, this);
                this.collection.fetch({success: this.collectionFetchedSuccess});
            },

            add: function(product) {
                productView = new ProductView({model: product});
                this.childViews.push(productView);
                productView.render();
            },

            searchProductEnterKey: function(e){
                // ENTER
                if(e.keyCode == 13){
                    this.searchProduct();
                }
            },

            searchProduct: function() {
                this.collection.product_name = $('#inputSearchProduct').val();
                this.removeChildrenViews();
                this.collection.reset();
                this.collection.fetch({success: this.collectionFetchedSuccess});
            },

            productChoosen: function(e) {
                $('#inputName').val($(e.currentTarget.children[0]).text());
                $('#inputEnergy_100g').val($(e.currentTarget.children[1]).text());
            },

            collectionFetchedSuccess: function(collection, response, options){
                $("#alertResultProducts").text(collection.count + " items found. Display "+collection.length);
                $("#alertResultProducts").show();
                $("#alertResultProducts").fadeTo(2000, 500).slideUp(500, function(){
                    $("#alertResultProducts").alert('close');
                });

            },

            removeChildrenViews: function(){
                // handle other unbinding needs, here
                _.each(this.childViews, function(childView){
                    if (childView.close){
                        childView.close();
                    }
                })
            }

        });

        return ProductsView;
    });
