define(["jquery","underscore", "components/<%= name%>/<%= name%>-controller"], function($, _, <%= jsVarsName%>Controller) {

    var settings = {
       elSelector: ".<%= name%>[element-id='<%= name%>']",

    };
     
    var elSettings = settings;

    els = $(settings.elSelector);

    _.each(els, function(el, key) {
        elSettings.el = $(el);
        new <%= jsVarsName%>Controller(settings);
    })

});








































