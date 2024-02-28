require('dotenv').config();

const MAPS_API_KEY = process.env.MAPS_API_KEY;

const ASK_ADDRESS = 'projects/acme-411216/locations/us-central1/agents/f3eaf70d-0665-4405-8ba4-485cdbd3645c/flows/00000000-0000-0000-0000-000000000000/pages/def7d4c5-9e09-4849-85d3-7190f5620049';

module.exports = {
    MAPS_API_KEY,
    ASK_ADDRESS
};
