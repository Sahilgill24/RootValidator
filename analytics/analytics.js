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
        const values = response.data.data.account;
        console.log(values)
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
}

getAccountData("0x00000000092c1d0569858c6c09b677540bee2d30");

async function getoperators(owner) {
    const api = `https://api.ssv.network/api/v4/holesky/operators/owned_by/${owner}?page=1&perPage=10&ordering=id`
    const response = await axios.get(api);
    console.log(response.data);




}
getoperators("0x00000000092c1d0569858c6c09b677540bee2d30");

async function clusterSnapshot(owner) {
    const query = `
query ClusterSnapshot {
    cluster(id: "${owner}") {
        active
        balance
        index
        lastUpdateBlockNumber
        networkFeeIndex
        validatorCount
    }
}`;
    try {
        const response = await axios.post(url, {
            headers: { 'Content-Type': 'application/json' },
            query: query
        });
        const clusterData = response.data.data.cluster;
        console.log(clusterData);
    } catch (error) {
        console.error('Error fetching cluster snapshot:', error);
    }
}
clusterSnapshot("0x00000000092c1d0569858c6c09b677540bee2d30");

async function getValidators(owner) {
    const query = `
query ListOfValidatorsPerOwner {
    validators(
        where: {owner: "${owner}"}
        first: 5
    ) {
        id
        owner {
            id
        }
        active
    }
}`;
    try {
        const response = await axios.post(url, {
            headers: { 'Content-Type': 'application/json' },
            query: query
        });
        const validatorData = response.data.data.validators;
        console.log(validatorData);
    } catch (error) {
        console.error('Error fetching validators:', error);
    }
}
getValidators("0x00000000092c1d0569858c6c09b677540bee2d30");

async function getNonce(account) {
    const query = `
query AccountNonceQuery {
    account(id: "${account}") {
        nonce
    }
}`;
    try {
        const response = await axios.post(url, {
            headers: { 'Content-Type': 'application/json' },
            query: query
        });
        const nonce = response.data.data.account.nonce;
        console.log(nonce);
    } catch (error) {
        console.error('Error fetching nonce:', error);
    }
}

getNonce("0x00000000092c1d0569858c6c09b677540bee2d30");