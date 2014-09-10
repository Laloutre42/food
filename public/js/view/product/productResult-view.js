define(['backbone', 'resthub', 'hbs!template/product/productResult', 'view/product/product-view'],
    function (Backbone, Resthub, productResultTemplate, ProductView) {

        var ProductResultView = Resthub.View.extend({

            root: '#searchAndDisplayProduct',

            template: productResultTemplate,

            events: {
                'click #searchProduct': 'searchProduct',
                'keypress #inputSearchProduct': 'searchProductEnterKey',
                'click #tableProducts tr': 'productChoosen',
                'click .paginateProduct': 'paginateProduct'
            },

            alreadyClickPageMove: false,
            alreadyClickSearchProduct: false,

            childViews: [],

            /**
             * Initialize
             * @param options
             */
            initialize: function () {

                this.render();

                this.listenTo(this.collection, 'add', this.add, this);
            },

            close: function () {
                this.remove();
                this.unbind();
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

                if (this.alreadyClickSearchProduct){
                    return;
                }
                this.alreadyClickSearchProduct = true;

                $("#tableProducts").addClass('hidden');

                $("#messageSearchProducts").addClass('hidden');
                $('#messageSearchProducts').text();

                this.collection.product_name = $('#inputSearchProduct').val();

                if (this.collection.product_name) {
                    this.removeChildrenViews();
                    this.collection.reset();
                    this.collection.getFirstPage({
                        success: $.proxy(this.collectionFetchedSuccess, this)
                    });
                }
            },

            productChoosen: function (e) {
                $('#inputItemName').val($(e.currentTarget.children[0]).text());
                $('#inputItemEnergy_100g').val($(e.currentTarget.children[1]).text());
                $('#newItemForm').bootstrapValidator('revalidateField', 'name');
                $('#newItemForm').bootstrapValidator('revalidateField', 'energy_100g');
            },

            collectionFetchedSuccess: function (collection, response, options) {

                console.log(collection.state.totalRecords + " items found. Display " + collection.length);
                var message = collection.state.totalRecords + " items found.";
                if (collection.truncate) {
                    message = "Too much items found. Truncate to 64."
                }

                this.alreadyClickSearchProduct = false;

                $("#messageSearchProducts").removeClass('hidden');
                $('#messageSearchProducts').text(message);
                this.page = 1;

                // Display pagination
                $(".pagination").addClass('hidden');
                if (collection.state.totalRecords > collection.length) {
                    var html = "<li class='paginateProduct previous'><a>&laquo;</a></li>";
                    var count = 0;
                    var i = 1;
                    while (count < collection.state.totalRecords) {
                        html += "<li class='paginateProduct' id='paginateProductPage" + i + "'><a>" + i + "</a></li>";
                        i++;
                        count += collection.length;
                    }
                    html += "<li class='paginateProduct next'><a>&raquo;</a></li>";
                    $('.pagination').html(html);
                    $('.pagination .previous').addClass('disabled');
                    $('#paginateProductPage1').addClass('active');
                    $(".pagination").removeClass('hidden');
                }

                if (collection.state.totalRecords > 0) {
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

            paginateProduct: function (event) {

                var element = $(event.currentTarget);
                if (element.hasClass('disabled') || element.hasClass('active')) {
                    event.stopImmediatePropagation();
                    return;
                }

                this.removeChildrenViews();
                this.collection.reset();

                // Previous page
                if (element.hasClass('previous')) {
                    if (this.collection.hasPreviousPage() && !this.alreadyClickPageMove) {
                        this.collection.getPreviousPage({
                            success: $.proxy(this.changePage, this),
                            page: this.page - 1
                        });
                        this.alreadyClickPageMove = true;
                    }
                }
                // Next page
                else if (element.hasClass('next')) {
                    if (this.collection.hasNextPage() && !this.alreadyClickPageMove) {
                        this.collection.getNextPage({
                            success: $.proxy(this.changePage, this),
                            page: this.page + 1
                        });
                        this.alreadyClickPageMove = true;
                    }
                }
                // Page number
                else {
                    var num = parseInt(element[0].id.slice(-1));

                    if (!this.alreadyClickPageMove) {
                        this.collection.getPage(num, {
                            success: $.proxy(this.changePage, this),
                            page: num
                        });
                        this.alreadyClickPageMove = true;
                    }
                }
            },

            changePage: function (collection, response, options) {
                this.page = options.page;

                $('.paginateProduct').removeClass('active');
                $('#paginateProductPage' + this.page).addClass('active');
                $('.pagination .previous').addClass('disabled');
                $('.pagination .next').addClass('disabled');

                if (this.collection.hasPreviousPage()) {
                    $('.pagination .previous').removeClass('disabled');
                }
                if (this.collection.hasNextPage()) {
                    $('.pagination .next').removeClass('disabled');
                }
                this.alreadyClickPageMove = false;
            }

        });

        return ProductResultView;
    })
;
