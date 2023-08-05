const fs = require('fs');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Read the addresses from a JSON file
const addressesJson = fs.readFileSync('wallets.json', 'utf-8');
const addressesObj = JSON.parse(addressesJson);
const whitelistAddresses = addressesObj.map(obj => obj.address);

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
const rootHash = '0x' + merkleTree.getRoot().toString('hex');

fs.writeFileSync('rootHash.txt', rootHash);

console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);

