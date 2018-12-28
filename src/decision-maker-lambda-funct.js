exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION");
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`);
        context.succeed(
          generateResponse(
            buildSpeechletResponse("This is the Decision Maker Alexa Skill. I can currently assist in picking a type of food to eat, as well as picking a color to wear.", false),
            {}
          )
        );
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`);
		var random, output, basePhrase;
		switch(event.request.intent.name){
			case "GetColorIntent" :
				var colors = [
					"blue",
					"green",
					"yellow", 
					"white", 
					"black", 
					"purple", 
					"red", 
					"teal", 
					"grey"
					];
				var color = colors[Math.floor(Math.random() * colors.length)];
		        random = Math.floor(Math.random() * 3);
		        switch(random) {
		        	case 0:
				    		basePhrase = "You should wear ";
				    		output = basePhrase.concat(color);
				    		break;
							case 1:
				    		basePhrase = " seems like a good choice today.";
				    		output = color.concat(basePhrase);
				    		break;
							case 2:
				    		basePhrase = "I think you should wear ";
				    		output = basePhrase.concat(color);
				    		break;
							default:
				    		//output = "An unexpected error has occurred.";
				    		throw "Invalid Intent";
		        }
				context.succeed(
					generateResponse(
						buildSpeechletResponse(output, true), 
							{}
					)
				);
				break;
				
			case "GetCuisineIntent":
				var cuisines = [
				"Mexican",
				"Japanese",
				"Chinese",
				"Italian",
				"French",
				"Indian",
				"Thai",
				"Korean",
				"Greek",
				"Vietnamese",
				"Filipino",
				"Mediterranean"
				];
				var cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
				random = Math.floor(Math.random() * 3);
				switch(random){
				    case 0:
				       basePhrase = "You should eat ";
				       basePhrase = basePhrase.concat(cuisine);
				       output = basePhrase.concat(" today");
				       break;
				    case 1:
				        basePhrase = "I think ";
				        basePhrase = basePhrase.concat(cuisine);
				        output = basePhrase.concat(" food sounds pretty good today");
				        break;
				    case 2:
				        basePhrase = "I think ";
				        basePhrase = basePhrase.concat(cuisine);
				        output = basePhrase.concat(" would be a good choice");
				        break;
				}
				
				context.succeed(
					generateResponse(
						buildSpeechletResponse(output, true), 
							{}
					)
				);
				break;
				
			case "GetMovieGenreIntent" :
				var genres = [
						"Action", 
						"Adventure",
						"Comedy",
						"Crime",
						"Drama",
						"Fantasy",
						"Mystery",
						"Political",
						"Romance",
						"Satire",
						"Science Fiction",
						"Thriller",
						"Western",
						"Kids"
					];
					var genre = genres[Math.floor(Math.random() * genres.length)];
					random = Math.floor(Math.random() * 3);
					switch (random) {
						case 0:
				       basePhrase = "You should watch a ";
				       basePhrase = basePhrase.concat(genre);
				       output = basePhrase.concat(" movie today");
				       break;
				    case 1:
				        basePhrase = "I think a ";
				        basePhrase = basePhrase.concat(genre);
				        output = basePhrase.concat(" movie sounds pretty good today");
				        break;
				    case 2:
				        basePhrase = "I think a ";
				        basePhrase = basePhrase.concat(genre);
				        output = basePhrase.concat(" movie would be a good choice");
				        break;
					}
					context.succeed(
					generateResponse(
						buildSpeechletResponse(output, true), 
							{}
					)
				);
				break;
			
			case "HelpIntent":
				var helpText = "I can currently assist in picking a type of food to eat, as well as picking a color to wear. For example, you could ask me where to eat today, and I would come up with a response. Additionally, you could ask me what to wear today, and I would come up with a color. Go ahead, try it for yourself.";
				context.succeed(
					generateResponse(
						buildSpeechletResponse(helpText, false), 
							{}
					)
				);
				break;
				
			case "StopIntent":
				var stopText = "Stopping.";
				context.succeed(
					generateResponse(
						buildSpeechletResponse(stopText, true), 
							{}
					)
				);
				break;
			
			default:
				throw "Invalid intent";
		}
            break;
      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`);
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

};

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
	outputSpeech: {
	  type: "PlainText",
	  text: outputText
	},
	shouldEndSession: shouldEndSession
  };
};

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };

};
