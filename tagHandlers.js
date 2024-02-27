const {
    formatResponseForDialogflow,
    verifyGeoLocation,
    getErrorMessage
} = require('./helperFunctions');

const handleVerifyAddress = async (req) => {
    
    return formatResponseForDialogflow(
        ['From the webhook.'],
        '',
        '',
        '',
        ''
    );
};

module.exports = {
    handleVerifyAddress
};
