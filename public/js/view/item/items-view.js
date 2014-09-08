define(['backbone', 'resthub', 'hbs!template/item/items', 'view/item/item-view', 'model/item',
        'view/item/general/description-view',
        'view/item/general/statisticsChart-view',
        'view/item/general/statisticsTable-view',
        'object/Total'],
    function (Backbone, Resthub, itemsTemplate, ItemView, Item, DescriptionView, StatisticsChartView, StatisticsTableView) {

        var ItemsView = Resthub.View.extend({

            root: '#container',
            template: itemsTemplate,
            events: {
                'click #createItem': 'createItem',
                "click #tableItems th.sortable": "headerClick",
                "click #descriptionItems": "changeViewItemsClick",
                "click #statisticsItems": "changeViewItemsClick",
                "click #statisticsChartItems": "changeViewItemsClick"
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

                _.bindAll(this, "addItemViewEvent");
                this.vent.on("addItemViewEvent", this.addItemViewEvent);

                this.render();
                this.listenTo(this.collection, 'add', this.add, this);
                this.listenTo(this.collection, "sort", this.updateTable, this);
                this.collection.fetch({
                    url: this.collection.url + '/listId/' + this.listId,
                    success: $.proxy(this.initTable, this)
                });
            },

            render: function () {
                ItemsView.__super__.render.apply(this);

                this.panelHeadingView = new StatisticsTableView({vent: this.vent});
                this.panelHeadingView.render();

                this.collection.forEach(this.add, this);

                return this;
            },

            add: function (item) {
                this.addItemViewEvent(new ItemView({model: item, vent: this.vent}));
            },

            addItemViewEvent: function (itemView) {
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

            initTable: function () {
                this.vent.trigger("computeTotal");

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
            },

            changeViewItemsClick: function (event) {

                var element = $(event.target);
                if (element[0].id == 'descriptionItems' && !element.hasClass('active')){
                    this.panelHeadingView.close();
                    this.panelHeadingView = new DescriptionView({listId: this.listId, vent: this.vent});
                    //this.panelHeadingView.render();
                }
                if (element[0].id == 'statisticsItems' && !element.hasClass('active')){
                    this.panelHeadingView.close();
                    this.panelHeadingView = new StatisticsTableView({vent: this.vent});
                    this.panelHeadingView.render();
                    this.vent.trigger("computeTotal");
                }
                if (element[0].id == 'statisticsChartItems' && !element.hasClass('active')){
                    this.panelHeadingView.close();
                    this.panelHeadingView = new StatisticsChartView({vent: this.vent});
                    this.panelHeadingView.render();
                }

            }

        });

        return ItemsView;
    });
