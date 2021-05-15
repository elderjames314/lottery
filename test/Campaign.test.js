const assert = require('assert');
const genache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(genache.provider());


const compileCampaignFactory = require('../ethereum/build/CampaignFactory.json');

const compileCampaign = require('../ethereum/build/Campaign.json'); 



let accounts;
let factory;

let campaignAddress;
let campaign;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compileCampaignFactory.interface))
        .deploy({data: compileCampaignFactory.bytecode})
        .send({from: accounts[0], gas: '1000000'});



    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

  [campaignAddress] =  await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(
    JSON.parse(compileCampaign.interface),
    campaignAddress
  );


  



});

describe("Campaigns", () => {

    it('Deploys a factory and campaing', ()=> {
        assert.ok(campaign.options.address);
        assert.ok(factory.options.address);
    });


    it("marks caller as the campaign manager", async () => {

        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);

    });


    it("It allows people to contribute money and mark them as an approval", async ()=> {
       await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        const isContributor = await campaign.methods.approvers(accounts[1]);

        assert(isContributor);

    });

    it('Require a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[2]
            })
            assert(false);
        }catch(err) {
           assert(err)
        }

    });

    it('A manage has ability to make a request', async () => {

        await campaign.methods.createRequest("supply of battery", 9999, accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });

            const request = await campaign.methods.requests(0).call();

            assert.equal(request.description, "supply of battery");


    });


    it('processes requests', async () => {

        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        })

        await campaign.methods.createRequest("Buying of cars", web3.utils.toWei('2', 'ether'), accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

       let balance =  await web3.eth.getBalance(accounts[1]);

       balance = web3.utils.fromWei(balance, 'ether');

       balance = parseFloat(balance);

       console.log(balance);

       assert(balance > 101);

    });

  });

