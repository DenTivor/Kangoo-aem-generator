var <%= jsVarsName%>Controller = (function () {
	function controller(settings) {
		// Implement Inheritance!
		_.extend(this, new BasicComponent(settings));
		
		// ============================ Your code here!!! 

		this.init();

		// ============================ //Your code here!!!
	}


	controller.prototype.init = function() {
		// ============================ Your code here!!! 

		console.log("<% variableName %> component init!");

		// ============================ //Your code here!!! 
	}
	return controller;
}());



