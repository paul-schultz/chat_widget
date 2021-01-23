'use strict'
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const projectId = 'faq-bot-lqsg'
const sessionId = uuid.v4();   
const languageCode = 'en-US'

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "C:/Users/icepi/github/chat_widget/keys/faq-bot-lqsg-0338b445bc95.json"
});


module.exports = {
    textQuery: async function( userMsg, parameters ) { 

        let sessionPath = sessionClient.sessionPath( projectId, sessionId );
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: userMsg,
                    languageCode: languageCode
                }
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient
        .detectIntent(request)
        responses = await self.handleAction(responses);
        return responses;
    },

    handleAction: function(responses) {
        return responses;
    }
}