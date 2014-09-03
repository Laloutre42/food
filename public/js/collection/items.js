define(['backbone', 'model/item'],
    function(Backbone, Item) {

    var Items = Backbone.Collection.extend({
        model: Item,
        url : "/items",

        sortAttribute: "category",
        sortDirection: 1,

        sortItems: function (attr) {
            this.sortAttribute = attr;
            this.sort();
        },

        comparator: function(a, b) {
            var a = a.get(this.sortAttribute),
                b = b.get(this.sortAttribute);

            if (a == b) return 0;

            if (this.sortDirection == 1) {
                return a > b ? 1 : -1;
            } else {
                return a < b ? 1 : -1;
            }
        }

    });

    return Items;

});
