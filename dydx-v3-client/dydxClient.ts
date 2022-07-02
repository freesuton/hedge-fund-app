require("dotenv").config();
const { DydxClient,AccountResponseObject,TransferResponseObject,AccountAction} = require('@dydxprotocol/v3-client')
const Web3 = require('web3')
const HTTP_HOST = 'https://api.stage.dydx.exchange'

const apiKeys = {
    key: process.env.API_KEY,
    passphrase: process.env.API_PASSPHRASE,
    secret: process.env.API_SECRET
};

const starkKeyPair = {
    publicKey: process.env.STARK_PUBLIC_KEY,
    privateKey: process.env.STARK_PRIVATE_KEY
};


const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/737cb9d8f40d4d3595d3fa19b73c5c9d'))

async function initClient() {
    const client = new DydxClient(HTTP_HOST, {
        web3:web3,
        apiTimeout: 3000,
        networkId: 3,
        apiKeyCredentials: apiKeys,
        starkPrivateKey: starkKeyPair,
        defaultEthereumAddress: process.env.WALLET_ADDRESS,
    });

    const account  = await client.private.getAccount(process.env.WALLET_ADDRESS);
    const positionID = account.account.positionId;

    console.log(
        'initialized. ethAddress:',
        'positionID:',
        positionID
    );
    const signature = await client.private.getRegistration()
    console.log("signature:")
    console.log(signature)
}

initClient().then(() => console.log('Done')).catch(console.error)