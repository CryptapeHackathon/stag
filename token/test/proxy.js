var ProxyContract = artifacts.require("Proxy");

contract('Proxy', function(accounts) {
  it("should set sender as owner", function() {
    return ProxyContract.deployed().then(function(instance) {
      return instance.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], "owner is not the sender");
    });
  });

  it("should return friends", function() {
    return ProxyContract.deployed().then(function(instance) {
        return instance.friendsList.call();
      }).then(function(friends) {
        assert.equal(friends.length, 5);
        assert.equal(friends[0], 0xceafd32198cab16115aa2e9b9efeab814d8a1e00d76a62eb7d0dba55ed5c3f22, "friends init wasn't correctly");
        assert.equal(friends[4], 0x7ee86b63f838f15260bbb772b31f46e854f26032421edcea4e646d7b4129da7e, "friends init wasn't correctly");
      });
  });

  it("should remove friend correctly", function() {
    let proxy_contract;

    return ProxyContract.deployed().then(function(instance) {
        proxy_contract = instance;
        return proxy_contract.removeFriend(0xceafd32198cab16115aa2e9b9efeab814d8a1e00d76a62eb7d0dba55ed5c3f22);
      }).then(function(result) {
        assert(result, "remove friend wasn't correctly");
        return proxy_contract.friendsList.call();
      }).then(function(friends) {
        assert.equal(friends.length, 4);
        return proxy_contract.removeFriend(0x7ee86b63f838f15260bbb772b31f46e854f26032421edcea4e646d7b4129da7e);
      }).then(function(result) {
      },function(e) {
        assert.match(e, /VM Exception while processing transaction: revert/, "remove friend in lock time should have raised VM exception");
        return proxy_contract.friendsList.call();
      }).then(function(friends) {
        assert.equal(friends.length, 4, "remove friend wasn't lock");
      });
  });

  it("add friend in locktime", function() {
    return ProxyContract.deployed().then(function(instance) {
      proxy_contract = instance;
      return proxy_contract.addFriend(0x406b6770b10ddb545190e75c1dc42b770c32582d4d4eab4bdcb19ff203bebefe);
    }).then(function(result) {
    },function(e) {
      assert.match(e, /VM Exception while processing transaction: revert/, "add friend in lock time should have raised VM exception");
      return proxy_contract.friendsList.call();
    }).then(function(friends) {
      assert.equal(friends.length, 4, "add friend wasn't lock");
    });
  })
});

contract('Proxy', function(accounts) {
  it("should add friend correctly", function() {
    let proxy_contract;
  
    return ProxyContract.deployed().then(function(instance) {
        proxy_contract = instance;
        return proxy_contract.addFriend(0x406b6770b10ddb545190e75c1dc42b770c32582d4d4eab4bdcb19ff203bebefe);
      }).then(function(result) {
        assert(result, "add friend wasn't correctly");
        return proxy_contract.friendsList.call();
      }).then(function(friends) {
        assert.equal(friends.length, 6);
        return proxy_contract.addFriend(0xe8b46fdedf0eff4303411904aa7414916704d2e80ff721f67f05abdecf81d087);
      }).then(function(result) {
      },function(e) {
        assert.match(e, /VM Exception while processing transaction: revert/, "add friend in lock time should have raised VM exception");
        return proxy_contract.friendsList.call();
      }).then(function(friends) {
        assert.equal(friends.length, 6, "add friend wasn't lock");
      });
  });
});
