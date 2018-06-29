pragma solidity ^0.4.19;

// -------------------------------------------------------------------------
// StagToken
//
// Copyright (c) 2018 CryptapeHackathon. The MIT Licence.
// -------------------------------------------------------------------------

import "./SafeMath.sol";
import "./StagTokenInterface.sol";
import "./Owned.sol";
import "./SecurityPolicy.sol";

contract StagToken is Owned, StagTokenInterface, SecurityPolicy {

    using SafeMath for uint256;

    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    mapping(address => mapping (address => uint256)) private allowed;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function StagToken() public {
        _symbol = "STG";
        _name = "Stag Token for CryptapeHackathon";
        _decimals = 18;
        _totalSupply = 100000000 * 10 ** uint256(_decimals);
        balances[owner] = _totalSupply;
        Transfer(address(0), owner, _totalSupply);
    }

    function name() view public returns (string) {
        return _name;
    }

    function symbol() view public returns (string) {
        return _symbol;
    }

    function decimals() view public returns (uint8) {
        return _decimals;
    }

    function totalSupply() view public returns (uint256) {
        return _totalSupply.sub(balances[address(0)]);
    }

    function balanceOf(address _owner) view public returns (uint256 balance) {
        balance = balances[_owner];
    }

    function transfer(address _to, uint256 _value) public checkPolicy(msg.sender, _value) returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
        success = true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        balances[_from] = balances[_from].sub(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(_from, _to, _value);
        success = true;
    }

    function approve(address _spender, uint256 _value) public checkPolicy(_spender, _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        success = true;
    }

    function allowance(address _owner, address _spender) view public returns (uint256 remaining) {
        remaining = allowed[_owner][_spender];
    }

    function () public payable {
        revert();
    }

    function transferDirectly(address _to, uint256 _value) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
        success = true;
    }

    function approveDirectly(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        success = true;
    }
}
