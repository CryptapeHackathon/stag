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
    deployer.deploy(ProxyContract, 3,3, 
      [0xceafd32198cab16115aa2e9b9efeab814d8a1e00d76a62eb7d0dba55ed5c3f22,
       0x1ceb97b401580d31d9b383897eabe046e1fb18cd2fa233064935f3e2d8c70e1c,
       0x91201a7370b50514be26a09cb34beddb67e1ebfe3f440921bfa03b6914e8bbdb,
       0x49c016931c81b9bcf613ed8b02d6049b74ff05e6eebbac63f3c4751e51939f0b,
       0x7ee86b63f838f15260bbb772b31f46e854f26032421edcea4e646d7b4129da7e], 
      [0xceafd32198cab16115aa2e9b9efeab814d8a1e00d76a62eb7d0dba55ed5c3f22,
       0x1ceb97b401580d31d9b383897eabe046e1fb18cd2fa233064935f3e2d8c70e1c,
       0x91201a7370b50514be26a09cb34beddb67e1ebfe3f440921bfa03b6914e8bbdb,
       0x49c016931c81b9bcf613ed8b02d6049b74ff05e6eebbac63f3c4751e51939f0b,
       0x7ee86b63f838f15260bbb772b31f46e854f26032421edcea4e646d7b4129da7e], "");

    deployer.link(SafeMath, StagToken);
    deployer.deploy(StagToken);
};
