define(['backbone', 'model/item'],
    function(Backbone, Item) {

    var Items = Backbone.Collection.extend({
        model: Item,
        url : "/items"
    });

    return Items;

});
