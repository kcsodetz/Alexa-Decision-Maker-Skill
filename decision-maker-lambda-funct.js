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
		
		switch(event.request.intent.name){
			
			case "GetColorIntent" :
				var colors = ["blue", "green", "yellow", "white", "black", "purple", "red", "teal", "grey"];
				var color = colors[Math.floor(Math.random()*colors.length)];
		        var rand = Math.floor(Math.random()*3);
		        var output;
		        var basePhrase;
		        switch(rand){
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
				    //output = "An unexpected error has occured.";
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
				"Mediterranean"];
				var cuisine = cuisines[Math.floor(Math.random()*cuisines.length)];
				var basePhrase1;
				var basePhrase2;
				var out;
				var random = Math.floor(Math.random()*3);
				switch(random){
				    case 0:
				       basePhrase1 = "You should eat ";
				       basePhrase1 = basePhrase1.concat(cuisine);
				       out = basePhrase1.concat(" today");
				       break;
				    case 1:
				        basePhrase1 = "I think ";
				        basePhrase1 = basePhrase1.concat(cuisine);
				        out = basePhrase1.concat(" food sounds pretty good today");
				        break;
				    case 2:
				        basePhrase1 = "I think ";
				        basePhrase1 = basePhrase1.concat(cuisine);
				        out = basePhrase1.concat(" would be a good choice");
				        break;
				}
				
				 
				context.succeed(
					generateResponse(
						buildSpeechletResponse(out, true), 
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