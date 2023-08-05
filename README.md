# ZToken

ZToken is an example project demonstrating how to implement NFT whitelisting using a Merkle Tree, in combination with the ERC-1155 token standard, leveraging the Hardhat development environment.


## Setup

1. Clone the repository using the following command:
    ```
    git clone https://github.com/akashvaghela09/ztoken-eip1155.git
    ```

2. After cloning the repo, navigate to the project directory and install the necessary dependencies.
    ```
    cd ztoken-eip1155 && npm install
    ```

## Scripts

- `npm run create-root-hash`: Read wallet addresses from a `wallets.json` file, creates a Merkle Tree, and writes the root hash to a `rootHash.txt` file.
    ```
    npm run create-root-hash
    ```


- `npm run node`: start a local Ethereum network using Hardhat.
    ```
    npm run node
    ```

- `npm run deploy`: Deploy the ZToken contract to the local Ethereum network. Make sure the local network node is running when using this script.

    ```
    npm run deploy
    ```

- `npm test`: Run test cases to verify the ZToken contract's functionalities.
    ```
    npm test
    ```

## How to Use

1. Run the local Ethereum node using `npm run node`. This will start a local Ethereum network. 

2. Copy some addresses from the local node and add them to the `wallets.json` file.

3. Run `npm run create-root-hash` to create a Merkle Tree using the addresses from `wallets.json`, and write the root hash to the `rootHash.txt` file.

4. Use `npm run deploy` to deploy the ZToken contract to the local Ethereum network. Make sure the local network node is running before you do this.

5. Run `npm test` to run test cases against the deployed ZToken contract.

## Reference

- [Merkle Tree NFT Whitelisting Example](https://github.com/davidrazmadzeExtra/Merkle_Tree_Whitelist_NFT/tree/main).
- For more information on MerkleTrees.js, see their [github repo](https://github.com/merkletreejs/merkletreejs#cdn).
- OpenZeppelin's Smart Contract [ERC-1155](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol) and [MerkleProof](https://github.com/binodnp/openzeppelin-solidity/blob/master/contracts/cryptography/MerkleProof.sol) implementations.