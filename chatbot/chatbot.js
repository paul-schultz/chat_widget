'use strict'
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/keys');

const projectId = config.googleProjectId;
const sessionId = uuid.v4();   
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials});

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