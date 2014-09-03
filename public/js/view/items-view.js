define(['backbone', 'resthub', 'hbs!template/items', 'view/item-view', 'model/item', 'object/Total'],
    function (Backbone, Resthub, itemsTemplate, ItemView, Item) {

        var ItemsView = Resthub.View.extend({

            root: '#itemsContainer',
            template: itemsTemplate,
            events: {
                'click #create': 'create',
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

                self = this;
                // Events aggregator object
                this.vent = attributes.vent;

                _.bindAll(this, "computeTotal");
                _.bindAll(this, "addViewEvent");
                this.vent.on("computeTotal", this.computeTotal);
                this.vent.on("addViewEvent", this.addViewEvent);

                this.render();
                this.listenTo(this.collection, 'add', this.add, this);
                this.listenTo(this.collection, "sort", this.updateTable, this);
                this.collection.fetch({success: $.proxy(this.initTableAndComputeTotal, this)});
            },

            render: function () {
                ItemsView.__super__.render.apply(this);
                this.collection.forEach(this.add, this);
                return this;
            },

            add: function (item) {
                this.addViewEvent(new ItemView({model: item, vent: this.vent}));
            },

            addViewEvent: function(itemView){
                itemView.render();
                this.childViews.push(itemView);
            },

            create: function () {
                item = new Item();
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

                //this.updateTable();
            },

            computeTotal: function () {

                var total = new Total();
                category = "";

                $('#tableItems > tbody >  tr').each(function () {

                    element = $(this);
                    category = element.find('.category').text();
                    weight = parseFloat(element.find('.weight').text());
                    energy = parseFloat(element.find('.energy').text());

                    total.incrementCategory(weight, energy, 0, category);
                });

                $('#breakfastTotalWeight').text(parseFloat(total.totalBreakfast.totalWeigh.toFixed(2)));
                $('#breakfastTotalEnergy').text(parseFloat(total.totalBreakfast.totalEnergy.toFixed(2)));

                $('#lunchTotalWeight').text(parseFloat(total.totalLunch.totalWeigh.toFixed(2)));
                $('#lunchTotalEnergy').text(parseFloat(total.totalLunch.totalEnergy.toFixed(2)));

                $('#dinerTotalWeight').text(parseFloat(total.totalDiner.totalWeigh.toFixed(2)));
                $('#dinerTotalEnergy').text(parseFloat(total.totalDiner.totalEnergy.toFixed(2)));

                $('#snackTotalWeight').text(parseFloat(total.totalSnack.totalWeigh.toFixed(2)));
                $('#snackTotalEnergy').text(parseFloat(total.totalSnack.totalEnergy.toFixed(2)));

                $('#allTotalWeight').text(parseFloat(total.totalAll.totalWeigh.toFixed(2)));
                $('#allTotalEnergy').text(parseFloat(total.totalAll.totalEnergy.toFixed(2)));
            },

            // Now the part that actually changes the sort order
            headerClick: function (e) {

                console.log("headerClick");

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

                console.log("updateTable");

                ref = this;

                this.removeChildrenViews();

                $table = this.$('#tableItems tbody');

                this.childViews = this.collection.map(
                    function (obj) {
                        console.log(obj);
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
            },

        });

        return ItemsView;
    });
