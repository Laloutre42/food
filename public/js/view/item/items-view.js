define(['backbone', 'resthub', 'hbs!template/item/items', 'view/item/item-view', 'model/item', 'object/Total'],
    function (Backbone, Resthub, itemsTemplate, ItemView, Item) {

        var ItemsView = Resthub.View.extend({

            root: '#container',
            template: itemsTemplate,
            events: {
                'click #createItem': 'createItem',
                "click #tableItems th.sortable": "headerClick"
            },

            childViews: [],

            // Make it easier to change later
            sortUpIcon: 'glyphicon glyphicon-chevron-up',
            sortDnIcon: 'glyphicon glyphicon-chevron-down',

            /**
             * Initialize
             * @param attributes
             */
            initialize: function (attributes) {

                this.vent = attributes.vent;
                this.listId = attributes.listId;

                _.bindAll(this, "computeTotal");
                _.bindAll(this, "addItemViewEvent");
                this.vent.on("computeTotal", this.computeTotal);
                this.vent.on("addItemViewEvent", this.addItemViewEvent);

                this.render();
                this.listenTo(this.collection, 'add', this.add, this);
                this.listenTo(this.collection, "sort", this.updateTable, this);
                this.collection.fetch({
                    url: this.collection.url + '/listId/' + this.listId,
                    success: $.proxy(this.initTableAndComputeTotal, this)
                });
            },

            render: function () {
                ItemsView.__super__.render.apply(this);
                this.collection.forEach(this.add, this);
                return this;
            },

            add: function (item) {
                this.addItemViewEvent(new ItemView({model: item, vent: this.vent}));
            },

            addItemViewEvent: function(itemView){
                itemView.render();
                this.childViews.push(itemView);
            },

            createItem: function () {
                item = new Item({listId: this.listId});
                // Silent cause we do not want to render but to be in edit mode
                this.collection.add(item, {silent: true});
                itemView = new ItemView({model: item, vent: this.vent});
                itemView.editItem();
            },

            initTableAndComputeTotal: function () {
                this.computeTotal();

                // Setup the sort indicators
                this.$('#tableItems th')
                    .append($('<span>'))
                    .closest('thead')
                    .find('span')
                    .addClass('ui-icon icon-none')
                    .end()
                    .find('[column="' + this.collection.sortAttribute + '"] span')
                    .removeClass('icon-none').addClass(this.sortUpIcon);
            },

            computeTotal: function () {

                var total = new Total();
                category = "";

                $('#tableItems > tbody >  tr').each(function () {

                    element = $(this);
                    category = element.find('.category').text();
                    weight = parseFloat(element.find('.weight').text());
                    energy = parseFloat(element.find('.energy').text());
                    energy_100g = parseFloat(element.find('.energy_100g').text());

                    total.incrementCategory(weight, energy, energy_100g, category);
                });

                $('#breakfastTotalWeight').text(parseFloat(total.totalBreakfast.totalWeigh.toFixed(2)));
                $('#breakfastTotalEnergy').text(parseFloat(total.totalBreakfast.totalEnergy.toFixed(2)));
                $('#breakfastAverageEnergy100g').text(parseFloat(total.totalBreakfast.averagelEnergy100g.toFixed(2)));

                $('#lunchTotalWeight').text(parseFloat(total.totalLunch.totalWeigh.toFixed(2)));
                $('#lunchTotalEnergy').text(parseFloat(total.totalLunch.totalEnergy.toFixed(2)));
                $('#lunchAverageEnergy100g').text(parseFloat(total.totalLunch.averagelEnergy100g.toFixed(2)));

                $('#dinerTotalWeight').text(parseFloat(total.totalDiner.totalWeigh.toFixed(2)));
                $('#dinerTotalEnergy').text(parseFloat(total.totalDiner.totalEnergy.toFixed(2)));
                $('#dinerAverageEnergy100g').text(parseFloat(total.totalDiner.averagelEnergy100g.toFixed(2)));

                $('#snackTotalWeight').text(parseFloat(total.totalSnack.totalWeigh.toFixed(2)));
                $('#snackTotalEnergy').text(parseFloat(total.totalSnack.totalEnergy.toFixed(2)));
                $('#snackAverageEnergy100g').text(parseFloat(total.totalSnack.averagelEnergy100g.toFixed(2)));

                $('#allTotalWeight').text(parseFloat(total.totalAll.totalWeigh.toFixed(2)));
                $('#allTotalEnergy').text(parseFloat(total.totalAll.totalEnergy.toFixed(2)));
                $('#allAverageEnergy100g').text(parseFloat(total.totalAll.averagelEnergy100g.toFixed(2)));
            },

            // Now the part that actually changes the sort order
            headerClick: function (e) {

                var $el = $(e.currentTarget),
                    ns = $el.attr('column'),
                    cs = this.collection.sortAttribute;

                // Toggle sort if the current column is sorted
                if (ns == cs) {
                    this.collection.sortDirection *= -1;
                } else {
                    this.collection.sortDirection = 1;
                }

                // Adjust the indicators.  Reset everything to hide the indicator
                $el.closest('thead').find('span').attr('class', 'ui-icon icon-none');

                // Now show the correct icon on the correct column
                if (this.collection.sortDirection == 1) {
                    $el.find('span').removeClass('icon-none').addClass(this.sortUpIcon);
                } else {
                    $el.find('span').removeClass('icon-none').addClass(this.sortDnIcon);
                }

                // Now sort the collection
                this.collection.sortItems(ns);
            },

            // This code has not changed from the example setup in the previous post.
            updateTable: function () {

                ref = this;
                this.removeChildrenViews();

                this.childViews = this.collection.map(
                    function (obj) {
                        itemView = new ItemView({model: ref.collection.get(obj), vent: ref.vent});
                        itemView.render();

                         return itemView;
                    });
            },

            removeChildrenViews: function () {
                // handle other unbinding needs, here
                _.each(this.childViews, function (childView) {
                    if (childView.close) {
                        childView.close();
                    }
                })
            }

        });

        return ItemsView;
    });
