const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("\nDeploying contracts with the account:", deployer.address);

  // Read the root hash from 'rootHash.txt'
  const rootHash = fs.readFileSync('rootHash.txt', 'utf-8').trim();
  
  // We get the contract to deploy
  const ZToken = await hre.ethers.getContractFactory("ZToken");
  const ztoken = await ZToken.deploy(rootHash);

  await ztoken.deployed();

  console.log("\nZToken deployed to:", ztoken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
