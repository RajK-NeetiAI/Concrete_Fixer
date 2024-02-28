const {
    formatResponseForDialogflow,
    verifyGeoLocation,
    readJsonFile
} = require('./helperFunctions');

const handleVerifyAddress = async (req) => {
    const session = req.body.sessionInfo.session;
    const address = req.body.sessionInfo.parameters.address;
    const verifiedAddress = await verifyGeoLocation(address);
    let responseData = {};
    if (verifiedAddress.status === 0) {
        responseData = formatResponseForDialogflow(
            [
                `There appears to be a problem with your address.`,
                `I have your address as ${address}, is this correct?`
            ],
            '',
            {
                session: session,
                parameters: {
                    validAddress: false
                }
            },
            '',
            ''
        )
    } else {
        responseData = formatResponseForDialogflow(
            [
                `I have your address as ${verifiedAddress.formattedAddress}, is this correct?`
            ],
            '',
            {
                session: session,
                parameters: {
                    validAddress: true,
                    formattedAddress: verifiedAddress.formattedAddress
                }
            },
            '',
            ''
        )
    }
    return responseData;
};

const handleCheckServiceAvailibility = async (req) => {
    const session = req.body.sessionInfo.session;
    const formattedAddress = req.body.sessionInfo.parameters.formattedAddress;
    const jsonData = readJsonFile('service_areas_days.json');
    let responseData = {};
    let serviceDaysOfWeek = '';
    for (let i = 0; i < jsonData.length; i++) {
        if (formattedAddress.toUpperCase().includes(jsonData[i].city.toUpperCase())) {
            serviceDaysOfWeek += jsonData[i].days_of_the_weeks;
            break;
        }
    }
    if (serviceDaysOfWeek === '') {
        responseData = formatResponseForDialogflow(
            [
                'I am so sorry, You are located outside of our service area.',
                'Would youlike to send a message to the management to see if we can make an exception?'
            ],
            '',
            {
                session: session,
                parameters: {
                    isServiceable: false,
                    serviceDaysOfWeek: serviceDaysOfWeek
                }
            },
            '',
            ''
        )
    } else {
        responseData = formatResponseForDialogflow(
            [
                'Perfect! We are almost done, I need just a few more things.',
                'We can only conduct estimates on behalf of a property owner or authorised representative.',
                'Are you the owner or authorised representative of the property?'
            ],
            '',
            {
                session: session,
                parameters: {
                    isServiceable: true,
                    serviceDaysOfWeek: serviceDaysOfWeek
                }
            },
            '',
            ''
        )
    }
    return responseData;
};

const handleHumanHandoff = () => {
    let responseData = formatResponseForDialogflow(
        [
            'Sure, I can connect you to a live agent.',
            'Please wait while I trnasfer your call.'
        ],
        '',
        '',
        '',
        ''
    );
    return responseData;
};

module.exports = {
    handleVerifyAddress,
    handleCheckServiceAvailibility,
    handleHumanHandoff
};
