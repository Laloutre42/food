define(['backbone', 'model/list'],
    function(Backbone, List) {

    var Lists = Backbone.Collection.extend({
        model: List,
        url : "/lists"

    });

    return Lists;

});
