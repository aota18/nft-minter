const hre = require("hardhat");

async function main() {
  const NFTCollection = await hre.ethers.getContractFactory("Collection");
  const nftCollection = await NFTCollection.deploy();
  await nftCollection.deployed();

  const N2DRewards = await hre.ethers.getContractFactory("N2DRewards");
  const n2dRewards = await N2DRewards.deploy();

  await n2dRewards.deployed();

  const NFTStaking = await hre.ethers.getContractFactory("NFTStaking");
  const nFTStaking = await NFTStaking.deploy(
    nftCollection.address,
    n2dRewards.address
  );

  await nFTStaking.deployed();

  console.log("NFTCollection deployed to:", nftCollection.address);
  console.log("N2DRewards deployed to:", n2dRewards.address);
  console.log("NFTStaking deployed to:", nFTStaking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
