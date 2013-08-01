var version = "0.0.1"; 
request = require('request'); 
url = require('url');

ddg = {
	query: function (query, options, callback) {
		default_options = {
			"useragent": "node-ddg v"+version,
			"format": "json",
			"pretty": "1",
			"no_redirects": "1",
			"no_html": "0",
			"skip_disambig": "0"
		};

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
	 	
		url = "https://api.duckduckgo.com/?q="+encodeURIComponent(query)+"&format="+options.format+"&t="+encodeURIComponent(options.useragent)+"&pretty="+options.pretty+"&no_redirects="+options.no_redirects+"&no_html="+options.no_html+"&skip_disambig="+options.skip_disambig
    	request(url, function(err, response, body){
    		if (err) console.log(err);
    		if (response.statusCode == 200) {
    			if (callback) {
    				callback(err, JSON.parse(body));
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
}

module.exports = ddg