const express = require('express');

const {
    formatResponseForDialogflow
} = require('./helperFunctions');

const {
    handleVerifyAddress,
    handleCheckServiceAvailibility,
    handleHumanHandoff
} = require('./tagHandlers')

const webApp = express();

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
    console.log(`Path ${req.path} with Method ${req.method}`);
    next();
});

webApp.get('/', (req, res) => {
    res.sendStatus(200);
});

webApp.post('/', async (req, res) => {
    let tag = req.body.fulfillmentInfo.tag;
    console.log('A new request came...');
    console.log(JSON.stringify(req.body, 2, ' '));
    console.log(tag);
    let responseData = {};
    if (tag === 'verifyAddress') {
        responseData = await handleVerifyAddress(req);
    } else if (tag === 'checkServiceAvailibility') {
        responseData = await handleCheckServiceAvailibility(req);
    } else if (tag === 'humanHandoff') {
        responseData = handleHumanHandoff(req);
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

// exports.dialogflowWebhook = webApp;

const PORT = process.env.PORT || 5000;

webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
