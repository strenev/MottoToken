const { deployments, hardhatArguments } = require("hardhat");

module.exports = async function () {
  if (
    hardhatArguments.network === "ganache" ||
    hardhatArguments.network === "hardhat" ||
    hardhatArguments.network === "rinkeby" ||
    hardhatArguments.network === "ropsten"
  ) {
    const { log } = deployments;
    const namedAccounts = await hre.getNamedAccounts();
    const MottoToken = await deployments.getOrNull("MottoToken");

    if (!MottoToken) {
      const mottoTokenDeployment = await deployments.deploy("MottoToken", {
        from: namedAccounts.deployer,
        args: ["2000000000000000000000000000", "0x9B8B2bf1E673d070600Ca7E818452776ff4FCF4C", "10000000"],
      });
      console.log("MottoToken deployed to:", mottoTokenDeployment.address);
    } else {
      log("MottoToken already deployed");
    }
  }
};

module.exports.tags = ["ActionFactory"];
