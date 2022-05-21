const Web3 = require('web3');
import {
    CONTRACT_ADDRESS_ETHEREUM,
    CONTRACT_ADDRESS_POLYGON,
    CONTRACT_ADDRESS_BSC,
    CONTRACT_ADDRESS_AVALANCHE,
    SATURN_ABI,
    ETHEREUM_NETWORK,
    POLYGON_NETWORK,
    BSC_NETWORK,
    AVALANCHE_NETWORK
} from './constants';

/**
 * Thrown when a valid transaction can't be executed from the inputs provided.
 */
export class ExecuteTransferError extends Error {
    name = 'ExecuteTransferError';
}

/**
 * Parameters for executing transfer of a NFT
 */
export interface ExecuteTransferParams {
    nominationID?: number;
}

export async function executeTransfer(
    provider: string,
    network: number,
    nominee: string,
    { nominationID }: ExecuteTransferParams = {}
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
        ExecuteTransferError;
    }
    saturn.methods
      .executeTransfer(nominationID)
      .send({ from: nominee })
      .on("transactionHash", (hash:string) => {
        console.log(hash);
      });
}
