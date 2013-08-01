# node-ddg
A node.js wrapper for DuckDuckGo's Instant Answers API. 

# Install
```
$ npm install ddg
```

# Usage

	ddg = require('ddg');

	ddg.query("duckduckgo", function(err, data){
		console.log(data) // logs a dictionary with all return fields
	});

See the instant answers API docs for more information on the return fields <https://api.duckduckgo.com/api>

### Custom options
	ddg = require('ddg');

	options = {
			"useragent": "My duckduckgo app",
			"no_redirects": "1",
			"no_html": "0",
	}

	ddg.query('duckduckgo', options, function(err, data){
		console.log(data)
	});

List of all options
* useragent
* format (json or xml)
* pretty (default: 1)
* no_html (default: 0)
* skip_disambig (default: 0)
* no_redirects (default: 1)

### Getting query AbstractText
Here I'm making a query for 'bioshock' and loging the AbstractText taken from Wikipedia.
	
	ddg = require('ddg');

	ddg.query('bioshock', options, function(err, data){
		console.log(data.AbstractText)
	});

Output:

	BioShock is a first-person shooter video game developed by Irrational Games (at the time, named 2K Boston), and published by 2K Games.

### Generating information from results (url,text)
With Instant Answers API + node-ddg it becomes quite simple to get duckduckgo data.

	ddg = require('ddg')

	ddg.query('bioshock', function(err, data){
		results = data.RelatedTopics; //related topics is a list of 'related answers'
		for (i=0;i<results.length;i++) {
			console.log(''+results[i].FirstURL)
			console.log('-- '+results[i].Text)
			console.log('\n')
		}
	});

Output:

	http://duckduckgo.com/BioShock_(series)
	-- BioShock (series) - BioShock is a first-person shooter video game series developed by Irrational Games—the first under the name 2K Boston/2K Australia—and designed by Ken Levine.


	http://duckduckgo.com/c/Video_games_set_in_the_1960s
	-- Video games set in the 1960s


	http://duckduckgo.com/c/Art_Deco_games
	-- Art Deco games


	http://duckduckgo.com/c/Video_games_using_Havok
	-- Video games using Havok


	http://duckduckgo.com/c/Alternate_history_video_games
	-- Alternate history video games


	http://duckduckgo.com/c/Dystopian_fiction
	-- Dystopian fiction


	http://duckduckgo.com/c/Video_games_developed_in_Australia
	-- Video games developed in Australia


	http://duckduckgo.com/c/Games_for_Windows_certified_games
	-- Games for Windows certified games


	http://duckduckgo.com/c/Unreal_Engine_games
	-- Unreal Engine games


	http://duckduckgo.com/c/Video_games_developed_in_Canada
	-- Video games developed in Canada

Now you can get and manipulate data from the API in a clean and asynchronous fashion.

### Access fields directly
If you want to get one specific field and nothing else, you can use **the field you want as a method** and run it as seen below.

	ddg.Definition('lion', function(err, data){
		console.log(data)
	});

Output:

	lion definition: a large heavily built social cat ('''Panthera leo''') of open or rocky areas chiefly of sub-Saharan Africa though once widely distributed throughout Africa and southern Asia that has a tawny body with a tufted tail and a shaggy blackish or dark brown mane in the male.

Here's a list of all Instant Answer API root fields (supported)
* Abstract
* AbstractText 
* AbstractSource
* AbstractURL
* Image
* Heading
* Answer
* AnswerType
* Definition (**used in example above**)
* DefinitionSource
* DefinitionURL
* RelatedTopics 
* Results
* Type
* Redirect

# Contact
Github - [jawerty](http://github.com/jawerty)

Twitter - [@jawerty](http://twitter.com/jawerty)

Email - jawerty210@gmail.com

Website - <http://jawerty.github.io>

# LICENSE
MIT LICENSE--see file /LICENSE 




**This project has no offiliation with the company DuckDuckGo.**