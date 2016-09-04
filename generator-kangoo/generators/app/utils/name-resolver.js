'use strict';

var nameResolver = function resolver() {
	console.log("Name Resolver modules")
}

nameResolver.trim = function(label){
	return label.replace(/^\s+|\s+$/g, "");
};


nameResolver.toCamel = function(label){
	return label.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};


nameResolver.toDash = function(label){
	return label.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

nameResolver.toUnderscore = function(label){
	return label.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

nameResolver.toLowerUnderscore = function(label){
	return label.replace(/(\-[a-z])/g, function($1){return $1.toLowerCase().replace('-','_');});
};

nameResolver.toHumanReadableName = function(label){
	return label.replace(/(\-[a-z])/g, function($1){return $1.replace('-',' ');});
};

module.exports = nameResolver;




