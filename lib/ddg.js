var version = "0.0.1"; 
request = require('request'); 
url = require('url');

// Library of fields that the Duck Duck Go API supports
fields = ["Abstract", "AbstractText", "AbstractSource", "AbstractURL", "Image", "Heading", "Answer", "AnswerType", "Definition", "DefinitionSource", "DefinitionURL", "RelatedTopics", "Results", "Type", "Redirect"];

// Default options to be sent as a query to the API
default_options = {
	"useragent": "node-ddg v"+version,
	"format": "json",
	"pretty": "1",
	"no_redirects": "1",
	"no_html": "0",
	"skip_disambig": "0"
};

function getURL(query, options) {
	URL = "https://api.duckduckgo.com/?q="+encodeURIComponent(query)+"&format="+options.format+"&t="+encodeURIComponent(options.useragent)+"&pretty="+options.pretty+"&no_redirects="+options.no_redirects+"&no_html="+options.no_html+"&skip_disambig="+options.skip_disambig;
	return URL;
}

function ddgRequest(url, callback, field) {
	request(url, function(err, response, body){
		if (err) console.log(err);
		if (response.statusCode == 200) {
			body = JSON.parse(body)
			if (callback) {
				if (field) {
					callback(err, body[field]);
					module.exports = ddg
				}
				else callback(err, body);
			} else {
				return body;
			}

		} else if (response.statusCode == 500) {
			console.log("node-ddg error: server error")
			return 0;
		} else {
			console.log("node-ddg error: problem with request code: "+response.statusCode)
			return 0;
		}
	});
}
(function main(){
	ddg = {
		query: function (query, options, callback) {
			if (typeof query == "undefined" || typeof query == "function") {
				console.log("node-ddg error: query not defined")
				return 0;
			}
			
			if (typeof options == "function") {
				callback = options
				options = default_options
			} else if (options) {
				for (property in options) {
					default_options[property] = options[property]
				}

				options = default_options
			} else {
				options = default_options
			}
		 	
			url = getURL(query, options)
	    	ddgRequest(url, callback);

		}
	}

	fields.forEach(function(field){
		ddg[field] = function(query, callback){
			
			if (typeof query == "undefined" || typeof query == "function") {
				console.log("node-ddg error: query not defined")
				return 0;
			}

			url = getURL(query, default_options);

			ddgRequest(url, callback, field);
		}
	});

})();

module.exports = ddg