const axios = require('axios');

const url = 'https://api.studio.thegraph.com/proxy/71118/ssv-network-holesky/version/latest';

async function getAccountData(account) {
    const query = `
query MyQuery {
    account(id: "${account}") {
        id
        validatorCount
        validators(first: 10, orderBy: id) {
            id
        }
    }
}`;

    try {
        const response = await axios.post(url, {
            headers: { 'Content-Type': 'application/json' },

            query: query

        });

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
}

getAccountData("0x00000000092c1d0569858c6c09b677540bee2d30");