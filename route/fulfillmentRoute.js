const { WebhookClient } = require('dialogflow-fulfillment');

module.exports = app => {
    app.post('/', (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });
  
        function fallback(agent) {
            agent.add('I\'m sorry, could you rephrase that?');
        }
        function test(agent) {
            agent.add('ICE COLD');
        }

        let intentMap = new Map();

        intentMap.set('Default Fallback Intent', fallback);
        intentMap.set('Knowledge.faq.faq.What\'s cooler than b', test);

        agent.handleRequest(intentMap);
    });
}