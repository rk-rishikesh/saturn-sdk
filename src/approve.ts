const Web3 = require('web3');
import {
    CONTRACT_ADDRESS_ETHEREUM,
    CONTRACT_ADDRESS_POLYGON,
    CONTRACT_ADDRESS_BSC,
    CONTRACT_ADDRESS_AVALANCHE,
    TOKEN_ABI,
    ETHEREUM_NETWORK,
    POLYGON_NETWORK,
    BSC_NETWORK,
    AVALANCHE_NETWORK,
} from './constants';

/**
 * Thrown when a valid transaction can't be executed from the inputs provided.
 */
export class ApproveError extends Error {
    name = 'ApproveError';
}

export async function approve(
    provider: string,
    network: number,
    owner: string,
    nftAddress: string
) {
    const web3 = new Web3(new Web3.providers.HttpProvider(provider));
    var nft;
    if (network == ETHEREUM_NETWORK) {
        nft = new web3.eth.Contract(TOKEN_ABI, nftAddress);
        nft.methods
        .setApprovalForAll(CONTRACT_ADDRESS_ETHEREUM, true)
        .send({ from: owner })
        .on('transactionHash', (hash: string) => {
            console.log(hash);
        });
    } else if (network == POLYGON_NETWORK) {
        nft = new web3.eth.Contract(TOKEN_ABI, nftAddress);
        nft.methods
        .setApprovalForAll(CONTRACT_ADDRESS_POLYGON, true)
        .send({ from: owner })
        .on('transactionHash', (hash: string) => {
            console.log(hash);
        });
    } else if (network == BSC_NETWORK) {
        nft = new web3.eth.Contract(TOKEN_ABI, nftAddress);
        nft.methods
        .setApprovalForAll(CONTRACT_ADDRESS_BSC, true)
        .send({ from: owner })
        .on('transactionHash', (hash: string) => {
            console.log(hash);
        });
    } else if (network == AVALANCHE_NETWORK) {
        nft = new web3.eth.Contract(TOKEN_ABI, nftAddress);
        nft.methods
        .setApprovalForAll(CONTRACT_ADDRESS_AVALANCHE, true)
        .send({ from: owner })
        .on('transactionHash', (hash: string) => {
            console.log(hash);
        });
    } else {
        ApproveError;
    }

}
