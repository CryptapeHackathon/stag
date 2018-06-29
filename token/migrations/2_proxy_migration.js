var Proxy = artifacts.require("./Proxy.sol");

module.exports = function(deployer) {
  deployer.deploy(Proxy, 3, 3);
};
