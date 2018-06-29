var ConvertLib = artifacts.require("./ConvertLib.sol");
var ProxyContract = artifacts.require("./Proxy.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var StagToken = artifacts.require("./StagToken.sol");

module.exports = function(deployer) {
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);
    
    deployer.deploy(SafeMath);

    deployer.link(SafeMath, ProxyContract);
    deployer.deploy(ProxyContract, 3, 2, [], [], "ly");

    deployer.link(SafeMath, StagToken);
    deployer.deploy(StagToken);
  };
