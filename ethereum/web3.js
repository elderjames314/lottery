import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //We are in the browser and metamaks is running...
    web3 = new Web3(window.web3.currentProvider);
}else {
    // We are on the browser where metamask is not running...
    const provider = new Web3.providers.HttpProvider
    (
        'sight grow column remove apple music mesh swing soul illness dentist design',
        'https://rinkeby.infura.io/v3/4205139a2f7b40049a08da26cd8b40e5',
    );

    web3 = new Web3(provider);

}


export default web3;