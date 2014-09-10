define(['backbone', 'backbone-paginator', 'model/product'],
    function(Backbone, BackbonePaginator, Product) {

    var Products = Backbone.PageableCollection.extend({

        model: Product,
        urlRoot: 'http://localhost:3000/products/product_name/',

        url: function() {
            return this.urlRoot + this.product_name;
        },

        parse: function(resp, xhr) {
            this.state.totalRecords = resp.count;
            this.truncate = resp.truncate;
            return resp.products;
        },

        state: {
            pageSize: 8
        }
    });

    return Products;

});
