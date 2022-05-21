const Web3 = require('web3');
import {
    CONTRACT_ADDRESS_ETHEREUM,
    CONTRACT_ADDRESS_POLYGON,
    CONTRACT_ADDRESS_BSC,
    CONTRACT_ADDRESS_AVALANCHE,
    SATURN_ABI,
    TOKEN_ABI,
    ETHEREUM_NETWORK,
    POLYGON_NETWORK,
    BSC_NETWORK,
    AVALANCHE_NETWORK
} from './constants';

/**
 * Thrown when a valid transaction can't be executed from the inputs provided.
 */
export class NominateError extends Error {
    name = 'NominateError';
}

/**
 * Parameters for adding nominee to your NFT
 */
export interface NominateParams {
    tokenAddress?: string;

    tokenId?: number;

    nominee?: string;
}

export async function nominate(
    provider: string,
    network: number,
    owner: string,
    { tokenAddress, tokenId, nominee }: NominateParams = {}
) {
    const web3 = new Web3(new Web3.providers.HttpProvider(provider));
    var saturn;
    if(network == ETHEREUM_NETWORK) {
        saturn = new web3.eth.Contract(SATURN_ABI, CONTRACT_ADDRESS_ETHEREUM);
    } else if(network == POLYGON_NETWORK) {
        saturn = new web3.eth.Contract(SATURN_ABI, CONTRACT_ADDRESS_POLYGON);
    } else if(network == BSC_NETWORK) {
        saturn = new web3.eth.Contract(SATURN_ABI, CONTRACT_ADDRESS_BSC);
    } else if(network == AVALANCHE_NETWORK) {
        saturn = new web3.eth.Contract(SATURN_ABI, CONTRACT_ADDRESS_AVALANCHE);
    } else {
        NominateError;
    }
    saturn.methods
      .Nominate(tokenAddress, tokenId, nominee)
      .send({ from: owner })
      .on("transactionHash", (hash:string) => {
        console.log(hash);
      });
}
