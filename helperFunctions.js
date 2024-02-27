const axios = require('axios');

const { MAPS_API_KEY } = require('./constant');

const verifyGeoLocation = async (address) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: MAPS_API_KEY
            }
        });
        const { data } = response;
        console.log(JSON.stringify(data, 2, ' '));
        if (data.results.length > 0) {
            const formattedAddress = data.results[0].formatted_address;
            return {
                status: 1,
                formattedAddress: formattedAddress
            };
        } else {
            return {
                status: 0,
                formattedAddress: ''
            };
        }
    } catch (error) {
        console.error('Error at verifyGeoLocation -> ', error);
        return {
            status: 0,
            formattedAddress: ''
        };
    }
};

const formatResponseForDialogflow = (messages, pageInfo, sessionInfo, targetFlow, targetPage) => {
    formattedMessages = [];
    messages.forEach(message => {
        formattedMessages.push(
            {
                text: {
                    text: [message],
                    redactedText: [message]
                },
                responseType: 'HANDLER_PROMPT',
                source: 'VIRTUAL_AGENT'
            }
        );
    });
    let responseData = {
        fulfillmentResponse: {
            messages: formattedMessages,
            mergeBehavior: 'MERGE_BEHAVIOR_UNSPECIFIED'
        }
    };
    if (pageInfo !== '') {
        responseData['pageInfo'] = pageInfo;
    }
    if (sessionInfo !== '') {
        responseData['sessionInfo'] = sessionInfo;
    }
    if (targetFlow !== '') {
        responseData['targetFlow'] = targetFlow;
    }
    if (targetPage !== '') {
        responseData['targetPage'] = targetPage;
    }
    return responseData
};

const getErrorMessage = () => {
    return formatResponseForDialogflow(
        [
            'We are facing a technical issue, please try after sometime.'
        ],
        '',
        '',
        ''
    );
};

module.exports = {
    formatResponseForDialogflow,
    getErrorMessage,
    verifyGeoLocation
};
