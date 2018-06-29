pragma solidity ^0.4.19;

import "./EIP20Interface.sol";

contract StagTokenInterface is EIP20Interface {
    function transferDirectly(address _to, uint256 _value) public returns (bool success);
    function approveDirectly(address _spender, uint256 _value) public returns (bool success);
}
