import web3 from './web3';
import CampaignFactory  from './build/CampaignFactory.json';

const instance  = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x4eD8c0f32E2448542aab3e8044E08092E23EAC35'
);

export default instance;