const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require('fs');
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');

describe("ZToken", function() {
  let ztoken;
  let owner;
  let addr1;
  let rootHash;
  let addressesObj;
  let merkleTree;
  let leaf;
  let proof;
  let tokenId;
  let amount;
  let data;
  let whitelistedAddr;
  let nonWhitelistedProof;

  before(async function() {
    [owner, addr1] = await ethers.getSigners();

    // Read the root hash from 'rootHash.txt'
    rootHash = fs.readFileSync('rootHash.txt', 'utf-8').trim();

    // We get the contract to deploy
    const ZToken = await ethers.getContractFactory("ZToken");
    ztoken = await ZToken.deploy(rootHash);
    await ztoken.deployed();

    // Read the addresses from 'addresses.json'
    const addressesJson = fs.readFileSync('wallets.json', 'utf-8');
    addressesObj = JSON.parse(addressesJson);
    const whitelistAddresses = addressesObj.map(obj => obj.address);
    whitelistedAddr = whitelistAddresses[0]; // use the first address in the whitelist

    // Create a merkle proof for whitelistedAddr
    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

    leaf = keccak256(whitelistedAddr);
    proof = merkleTree.getHexProof(leaf);

    // Create a merkle proof for non-whitelisted address
    const nonWhitelistedLeaf = keccak256(addr1.address);
    nonWhitelistedProof = merkleTree.getHexProof(nonWhitelistedLeaf);

    tokenId = 1;
    amount = 100;
    data = ethers.utils.randomBytes(32);
  });

  it("Should mint NFT if address is whitelisted", async function() {
    await ztoken.connect(owner).mint(whitelistedAddr, tokenId, amount, data, proof);
  });

  it("Should return the balance of the minted address", async function() {
    const balance = await ztoken.balanceOf(whitelistedAddr, tokenId);
    expect(balance).to.equal(amount);
  });

  it("Should not allow non-whitelisted address to mint", async function() {
    await expect(ztoken.connect(owner).mint(addr1.address, tokenId, amount, data, nonWhitelistedProof)).to.be.revertedWith("Address is not whitelisted");
  });
});
