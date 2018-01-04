define(["jquery","underscore", "components/basicComponent"], function($, _, BasicComponent) {
    var <%= className%> = (function(){
        function controller(settings) {
            _.extend(this, new BasicComponent(settings));
            this.init();
        }


        controller.prototype.init = function(){
            console.log("<%= humanReadableName%> controller init");
            this.bindHandlers();
        }


        controller.prototype.bindHandlers = function(){
            var element = this.getInnerEl("");

            element.off("click").on("click", _.bind(this.onElementClick, this));
        }


        controller.prototype.onElementClick = function(){
            console.log("Element switch");
        }
        

        // controller.prototype.init = function(){}
        
        return controller;
    })();

    return <%= className%>;
});