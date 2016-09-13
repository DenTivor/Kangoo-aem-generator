var <%= jsVarsName%>Init = (function () {
	function controller() {		
		// Your code here!!!

		var settings = {
			elSelector: ".<%= variableName%>[element-id='<%= variableName%>']"
		};

		var elements = $(settings.elSelector);
        
		_.each(elements, function(element, key) {
			var elementSettings = {};
			var el = $(element);

			elementSettings.el = el;

			_.extend(elementSettings, settings);
			new multTestController(elementSettings);
		});

		// //Your code here!!!
	}
	
	return controller;
}());