define(['backbone', 'resthub', 'hbs!template/list/lists', 'view/list/list-view', 'model/list'],
    function (Backbone, Resthub, listsTemplate, ListView, List) {

        var ListsView = Resthub.View.extend({

            root: '#container',
            template: listsTemplate,
            events: {
                'click #createList': 'createList',
                "click #tableLists th.sortable": "headerClick"
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

                _.bindAll(this, "addListViewEvent");
                this.vent.on("addListViewEvent", this.addListViewEvent);

                this.render();
                this.listenTo(this.collection, 'add', this.add, this);
                this.listenTo(this.collection, "sort", this.updateTable, this);
                this.collection.fetch({success: $.proxy(this.initTable, this)});
            },

            render: function () {
                ListsView.__super__.render.apply(this);
                this.collection.forEach(this.add, this);
                return this;
            },

            add: function (list) {
                this.addListViewEvent(new ListView({model: list, vent: this.vent}));
            },

            addListViewEvent: function(listView){
                listView.render();
                this.childViews.push(listView);
            },

            createList: function () {
                var list = new List();
                // Silent cause we do not want to render but to be in edit mode
                this.collection.add(list, {silent: true});
                listView = new ListView({model: list, vent: this.vent});
                listView.editList();
            },

            initTable: function () {

                // Setup the sort indicators
                this.$('#tableLists th')
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
                this.collection.sortLists(ns);
            },

            updateTable: function () {

                var ref = this;
                this.removeChildrenViews();

                this.childViews = this.collection.map(
                    function (obj) {
                        listView = new ListView({model: ref.collection.get(obj), vent: ref.vent});
                        listView.render();

                        return listView;
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

        return ListsView;
    });
