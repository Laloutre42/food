define(['backbone', 'model/product'],
    function(Backbone, Product) {

    var Products = Backbone.Collection.extend({

        model: Product,
        urlRoot: 'http://localhost:3000/products/product_name/',

        url: function() {
            return this.urlRoot + this.product_name;
        },

        parse: function(resp, xhr) {
            this.count = resp.count;
            return resp.products;
        }
    });

    return Products;

});
