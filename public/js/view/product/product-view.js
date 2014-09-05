define(['backbone', 'resthub', 'hbs!template/product/product'],
    function (Backbone, Resthub, productTemplate) {

        var ProductView = Resthub.View.extend({

            root: '#tableProducts',
            strategy: 'append',
            tagName: 'tr',

            template: productTemplate,

            /**
             * Initialize
             * @param options
             */
            initialize: function () {
            },

            close: function() {
                this.remove();
                this.unbind();
            }

        });

        return ProductView;
    });
