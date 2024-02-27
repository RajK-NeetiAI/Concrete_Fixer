const express = require('express');

const {
    formatResponseForDialogflow
} = require('./helperFunctions');

const {
    handleVerifyAddress
} = require('./tagHandlers')

const webApp = express();

webApp.get('/', (req, res) => {
    res.sendStatus(200);
});

webApp.post('/', async (req, res) => {
    let tag = req.body.fulfillmentInfo.tag;
    let query = req.body.text;
    console.log('A new request came...');
    console.log(JSON.stringify(req.body, 2, ' '));
    console.log(tag);
    let responseData = {};
    if (tag === 'verifyAddress') {
        responseData = await handleVerifyAddress(req);
    } else {
        responseData = formatResponseForDialogflow(
            [
                'This is from the webhook.',
                'There is no tag set for this request.'
            ],
            '',
            '',
            '',
            ''
        );
    }
    res.send(responseData);
});

exports.dialogflowWebhook = webApp;
