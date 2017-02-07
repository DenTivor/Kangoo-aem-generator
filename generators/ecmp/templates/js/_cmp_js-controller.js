define(["jquery","underscore", "components/basicComponent"], function($, _) {
    var <%= jsVarsName%> = (function(){
        function controller(settings) {
            _.extend(this, new BasicComponent(settings));
            this.init();
        }


        controller.prototype.init = function(){
            console.log("<%= humanReadableName%> controller init");
        }


        // controller.prototype.init = function(){}
        
        return controller;
    })();

    return <%= jsVarsName%>;
});