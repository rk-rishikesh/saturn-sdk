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
export class FetchRequestError extends Error {
    name = 'FetchRequestError';
}

/**
 * Parameters for initating a fetch request for a NFT
 */
export interface FetchRequestParams {
    nominationID?: number;
}

export async function initiateFetchRequest(
    provider: string,
    network: number,
    nominee: string,
    { nominationID }: FetchRequestParams = {}
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
        FetchRequestError;
    }
    saturn.methods
      .initiateFetchRequest(nominationID)
      .send({ from: nominee })
      .on("transactionHash", (hash:string) => {
        console.log(hash);
      });
}
