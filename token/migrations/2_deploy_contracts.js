var ConvertLib = artifacts.require("./ConvertLib.sol");
// var Proxy = artifacts.require("./Proxy.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
// var StagToken = artifacts.require("./Token.sol");

module.exports = function(deployer) {
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);

    // deployer.deploy(Proxy, 3, 3);

    // deployer.deploy(StagToken, 100000000000);
  };
