define(["jquery","underscore", "components/<%= variableName%>/<%= variableName%>-controller"], function($, _, <%= className%>Controller) {

    var settings = {
    	elSelector: ".<%= variableName%>[element-id='<%= variableName%>'][view-type='<%= viewType%>']",
    },
    elSettings = settings,
    els = $(settings.elSelector);

    _.each(els, function(el) {
        elSettings.el = $(el);
        new <%= className%>Controller(settings);
    })

});