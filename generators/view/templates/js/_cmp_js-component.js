define(["jquery","underscore", "components/basicComponent"], function($, _, BasicComponent) {
    var <%= className%>Component = (function(){
        function controller() {
            var settings = {
               elSelector: ".<%= variableName%>[element-id='<%= variableName%>']",
               btnElSelector: "[action-button]"
            };
            
            ObjectUtils.elementComponentFactory(settings, <%= className%>);
        }
        return controller;
    })();





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
            var btn = this.getInnerEl("btnElSelector");

            btn.off("click").on("click", _.bind(this.onBtnClick, this));
        }


        controller.prototype.onBtnClick = function(){
            commonController.openModal("some-other");
        }
        

        // controller.prototype.init = function(){}
        
        return controller;
    })();

    return <%= className%>Component;
});