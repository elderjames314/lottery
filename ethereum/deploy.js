// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

const compileFactory = require('./build/CampaignFactory.json');


const provider = new HDWalletProvider (
    'sight grow column remove apple music mesh swing soul illness dentist design',
    'https://rinkeby.infura.io/v3/4205139a2f7b40049a08da26cd8b40e5'
);

const web3 = new Web3(provider);

const deploy = async () => {

    //get the list of accounts from Mnemonic
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deployment from the account: "+ accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({
        data: compileFactory.bytecode
    }).send({
        gas: '1000000',
        from: accounts[0]
    });

    console.log(result.options.address);


};

deploy();