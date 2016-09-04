var <%= jsVarsName%>Init = (function () {
	function controller() {		
		// Your code here!!!

		var settings = {
			elSelector: ".<%= variableName%>"
		};

		var cmpController = new <%= jsVarsName%>Controller(settings);

		// //Your code here!!!
	}
	
	return controller;
}());