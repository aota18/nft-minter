require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "goerli",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/rEPv0vQKdkfYw-om5520prvHSblvEjaO",
      accounts: [`0x${process.env.ALCHEMY_PVK}`],
      gasPrice: 50000000000,
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/xE2gD5zYAI3yD3NPsXYfHHbojSGuIKEa",
      accounts: [`0x${process.env.GOERLI_PVK}`],
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./src/contracts/artifacts",
  },
};
