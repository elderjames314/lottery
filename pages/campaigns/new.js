import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider (
    'sight grow column remove apple music mesh swing soul illness dentist design',
    'https://rinkeby.infura.io/v3/4205139a2f7b40049a08da26cd8b40e5'
);

const web3 = new Web3(provider);


class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        address: ''
    }

    
    onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts()
        //console.log(accounts);
        console.log(this.state.minimumContribution);
        this.setState({address: accounts[0]});
        console.log(this.state.address);

        await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from: this.state.address
            });
    }
  render() {
    return (
      <Layout>
        <h3>Create a campaign</h3>

        <Form onSubmit={this.onSubmit}>
            <Form.Field>
                <label>Minimum contribution</label>
                <Input label="wei" labelPosition="right"
                placeholder="Minimum contribution"
                value={this.state.minimumContribution}
                onChange={event=>this.setState({minimumContribution:event.target.value})}
                />
            </Form.Field>

            <Button primary>Create campaign</Button>
        </Form>

      </Layout>
    );
  }
}

export default CampaignNew;
