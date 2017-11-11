define(["jquery","underscore", "components/<%= name%>/<%= name%>-controller"], function($, _, <%= className%>Controller) {

    var settings = {
       elSelector: ".<%= name%>[element-id='<%= name%>']",

    },
    elSettings = settings,
    els = $(settings.elSelector);

    _.each(els, function(el) {
        elSettings.el = $(el);
        new <%= className%>Controller(settings);
    })

});