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
    var proxy_contract;
    return ProxyContract.deployed().then(function(instance) {
        proxy_contract = instance;
        return proxy_contract.removeFriend(0xceafd32198cab16115aa2e9b9efeab814d8a1e00d76a62eb7d0dba55ed5c3f22);
      })
      .then(function(result) {
        assert(result, "remove friend wasn't correctly");
        return proxy_contract.friendsList.call();
      })
      .then(function(friends) {
        assert.equal(friends.length, 4);
      });
  });
});
