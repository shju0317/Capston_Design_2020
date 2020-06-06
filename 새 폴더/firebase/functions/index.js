// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

   // Uncomment and edit to make your own intent handler
   // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
   // below to get this function to be run when a Dialogflow intent is matched
   function getAgenda(agent) {
        let resp = ``;
       
        switch(parseInt(agent.parameters.tracks)){
            case 1: resp = `Track 1 Schedule:\n
9:00 - 9:30 Registrations\n
9:35 - 9:55 Keynote\n 
10:00 - 10:45 "JOMO" - The Joy of Missing Out and the Freedom of Disconnecting\n 
10:50 - 11:35 Data Informed Design\n
11:40 - 12:10 High Performance Programming Habits\n 
12:15 - 12:45 Creating your first HTML5 game\n 
12:50 - 13:30 Lunch\n 
13:35 - 14:10 It's Fun Time!\n 
14:15 - 14:55 Advertisement in Mobile Apps : Best Practices\n 
15:00 - 15:30 Developer Student Clubs: Everything You Need To Know\n 
16:15 - 16:30 Conclusion Note!\n`;
            resp += `\n\n Do you want to continue?`;
            agent.add(resp);
            break;

            case 2: resp = `Track 2 Schedule:\n
9:00 - 9:30 Registrations\n 
9:35 - 9:55 Keynote\n 
10:00 - 10:45 Actions on Google : Introduction & Best Practices\n 
10:50 - 11:35 Machine Learning : Getting Started [Tensor Flow & Keras]\n 
11:40 - 12:10 Google Cloud : Data Preparation at Scale in a Serverless Environment\n
12:15 - 12:45 DataFlow\n
12:50 - 13:30 Lunch\n 
13:35 - 14:10 Super Fast Flash Talks\n 
14:15 - 14:55 Firebase ML Kit : Mobile Machine Learning Made Easy\n
15:00 - 15:30 The Design of Things: Designing for AI, IoT, Conversations, and The Future\n
16:15 - 16:30 Conclusion Note!\n`;
            resp += `\n\n Do you want to continue?`;
            agent.add(resp);
            break;
            
            case 3: resp = `Track 3 Schedule:\n
9:00 - 9:30 Registrations\n
9:35 - 9:55 Keynote\n
10:00 - 10:45 Why Flutter Is So Hot?\n
10:50 - 11:35 Android Chatbot Using DialogFlow\n
11:40 - 12:10 Android: Developing Clean Architecture Apps\n
12:15 - 12:45 Kotlin-Native and The Beauty of Shared Code\n
12:50 - 13:30 Lunch\n
13:35 - 14:10 It's Fun Time!\n
14:15 - 14:55 Unmasking Kotlin Coroutines\n
15:00 - 15:30 Design Thinking and Design Sprints\n
16:15 - 16:30 Conclusion Note!\n`;
            resp += `\n\n Do you want to continue?`;
            agent.add(resp);
            break;
            
            case 4: resp = `Track 4 Schedule:\n
9:00 - 9:30 Registrations\n
9:35 - 9:55 Keynote\n
10:00 - 11:35 Design Thinking Workshop\n
12:50 - 13:30 Lunch\n 
13:35 - 14:55 Design Thinking Workshop\n
16:15 - 16:30 Conclusion Note!\n`;
            resp += `\n\n Do you want to continue?`;
            agent.add(resp);
            break;
            
            default: resp = `I am sorry! I don't have information for Track ${agent.parameters.tracks}. Please select the track number from 1-4 for which you want to have the session's details`;
                     agent.add(resp);
            break;
        }
   }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('fallback', welcome);
  intentMap.set('welcome', fallback);
  intentMap.set('get_agenda', getAgenda);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
