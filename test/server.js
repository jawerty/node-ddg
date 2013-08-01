ddg = require('../lib/ddg')

	ddg.query('bioshock', function(err, data){
		results = data.RelatedTopics; //related topics is a list of 'related answers'
		for (i=0;i<results.length;i++) {
			console.log(''+results[i].FirstURL)
			console.log('-- '+results[i].Text)
			console.log('\n')
		}
	});