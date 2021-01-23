const chatbot = require('../chatbot/chatbot');

module.exports = app => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-requested-With, content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        
        next();
    })

    app.post('/send-msg', async (req, res) => {

        let responses = await chatbot.textQuery(req.body.userMsg, req.body.parameters);
        res.send(responses[0].queryResult);
   });  
}

