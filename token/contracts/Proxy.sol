pragma solidity ^0.4.24;

// -------------------------------------------------------------------------
// Proxy
//
// Copyright (c) 2018 CryptapeHackathon. The MIT Licence.
// -------------------------------------------------------------------------

import "./SafeMath.sol";
import "./StagTokenInterface.sol";

library ArrayUtil {

    /// @notice Remove the value of the array
    /// @param _value The value of to be removed
    /// @param _array The array to remove from
    /// @return true if successed, false otherwise
    function remove(bytes32 _value, bytes32[] storage _array)
        internal
        returns (bool)
    {
        uint _index = index(_value, _array);
        // Not found
        if (_index >= _array.length)
            return false;

        // Move the last element to the index of array
        _array[_index] = _array[_array.length - 1];

        // Also delete the last element
        delete _array[_array.length - 1];
        _array.length--;
        return true;
    }

    /// @notice Get the index of the value in the array
    /// @param _value The value to be founded
    /// @param _array The array to find from
    /// @return The index if founded, length of array otherwise
    function index(bytes32 _value, bytes32[] _array)
        internal
        pure
        returns (uint i)
    {
        // Find the index of the value in the array
        for (i = 0; i < _array.length; i++) {
            if (_value == _array[i])
                return i;
        }
    }

    /// @notice Check if the value in the array
    /// @param _value The value to be checked
    /// @param _array The array to check from
    /// @return true if existed, false otherwise
    function exist(bytes32 _value, bytes32[] _array)
        internal
        pure
        returns (bool)
    {
        // Have found the value in array
        for (uint i = 0; i < _array.length; i++) {
            if (_value == _array[i])
                return true;
        }
        // Not in
        return false;
    }

    /// @notice Check the array is null:
    /// 1. the length is zero 2. all values of array are zero
    /// @param _array The array to check from
    /// @return true if is null, false otherwise
    function isNull(bytes32[] _array)
        internal
        pure
        returns (bool)
    {
        if (_array.length == 0)
            return true;
        for (uint i = 0; i < _array.length; i++) {
            if (bytes32(0x0) != _array[i])
                return false;
        }

        return true;
    }
}

library AddressArrayUtil {

    /// @notice Remove the value of the array
    /// @param _value The value of to be removed
    /// @param _array The array to remove from
    /// @return true if successed, false otherwise
    function remove(address _value, address[] storage _array)
        internal
        returns (bool)
    {
        uint _index = index(_value, _array);
        // Not found
        if (_index >= _array.length)
            return false;

        // Move the last element to the index of array
        _array[_index] = _array[_array.length - 1];

        // Also delete the last element
        delete _array[_array.length - 1];
        _array.length--;
        return true;
    }

    /// @notice Get the index of the value in the array
    /// @param _value The value to be founded
    /// @param _array The array to find from
    /// @return The index if founded, length of array otherwise
    function index(address _value, address[] _array)
        internal
        pure
        returns (uint i)
    {
        // Find the index of the value in the array
        for (i = 0; i < _array.length; i++) {
            if (_value == _array[i])
                return i;
        }
    }

    /// @notice Check if the value in the array
    /// @param _value The value to be checked
    /// @param _array The array to check from
    /// @return true if existed, false otherwise
    function exist(address _value, address[] _array)
        internal
        pure
        returns (bool)
    {
        // Have found the value in array
        for (uint i = 0; i < _array.length; i++) {
            if (_value == _array[i])
                return true;
        }
        // Not in
        return false;
    }

    /// @notice Check the array is null:
    /// 1. the length is zero 2. all values of array are zero
    /// @param _array The array to check from
    /// @return true if is null, false otherwise
    function isNull(address[] _array)
        internal
        pure
        returns (bool)
    {
        if (_array.length == 0)
            return true;
        for (uint i = 0; i < _array.length; i++) {
            if (address(0x0) != _array[i])
                return false;
        }

        return true;
    }
}

contract Proxy {
    using ArrayUtil for ArrayUtil;
    using SafeMath for uint256;

    address public owner;
    // For recover
    bytes32[] public friends;
    // Sha3(address) for safety
    mapping(bytes32 => bool) public friendSet;
    uint256 public threshold;
    mapping(bytes32 => address) public recoverSet;
    mapping(address => uint256) public addressSet;
    address[] public addressList;

    // For transferDirectly and approveDirectly
    bytes32[] public approvers;
    // Sha3(address) for safety
    mapping(bytes32 => bool) public approverSet;
    uint256 public minApprove;
    // Time lock
    uint256 public lock;
    uint256 public approveLock;
    string public salt;
    uint256 public lastOwnerAction;
    address public beneficiary;

    enum Category { Transfer, Allowance }
    enum Status { Pending, Finish, Failed }

    struct Proposal {
        Category category;
        address contractAddress;
        address beneficiary;
        uint256 value;
        Status status;
        bytes32[] approvers;
        uint256 minApprove;
    }

    uint256 public proposalId;
    mapping(uint256 => Proposal) public proposals;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier thresholdLimit(uint _threshold) {
        require(_threshold >= 3);
        _;
    }

    modifier minApproveLimit(uint _threshold) {
        require(_threshold >= 2);
        _;
    }

    modifier checkTimeLock() {
        require(now > lock);
        _;
    }

    modifier checkApproveTimeLock() {
        require(now > approveLock);
        _;
    }        

    constructor(uint256 _threshold, uint256 _minApprove, bytes32[] _friends, bytes32[] _approvers, string _salt)
        public
        thresholdLimit(_threshold)
        minApproveLimit(_minApprove)
    {
        owner = msg.sender;
        threshold = _threshold;
        minApprove = _minApprove;
        friends = _friends;
        for (uint i = 0; i < friends.length; i++) {
            friendSet[friends[i]] = true;
        }
        approvers = _approvers;
        for (i = 0; i < approvers.length; i++) {
            approverSet[approvers[i]] = true;
        }
        salt = _salt;
        lastOwnerAction = now;
    }

    function setBeneficiary(address _beneficiary) public
        onlyOwner
        returns(bool)
    {
        beneficiary = _beneficiary;
        lastOwnerAction = now;
        return true;
    }

    function friendsList() public
        view
        returns(bytes32[])
    {
        return friends;        
    }

    function addFriend(bytes32 friend) public
        onlyOwner
        checkTimeLock
        returns(bool)
    {
        lastOwnerAction = now;
        if (!friendSet[friend]) {
            friends.push(friend);
            friendSet[friend] = true;
            lock += 24 hours;
            return true;
        }
    }

    function removeFriend(bytes32 friend) public
        onlyOwner
        checkTimeLock
        returns(bool)
    {
        lastOwnerAction = now;
        if (friendSet[friend]) {
            friendSet[friend] = false;
            
            ArrayUtil.remove(friend, friends);
            lock += 24 hours;
            return true;
        }
    }

    function setThreshold(uint256 _threshold) public 
        onlyOwner
        thresholdLimit(_threshold)
        checkTimeLock
        returns(bool)
    {
        threshold = _threshold;
        lock += 7 days;
        lastOwnerAction = now;
        return true;
    }
 
    function recover(address newAddress) public 
        returns(bool)
    {
        // Only friend
        bytes32 friend = keccak256(abi.encodePacked(msg.sender, salt));
        require(friendSet[friend]);

        require(owner != newAddress);

        address oldAddress = recoverSet[friend];
        if (recoverSet[friend] != newAddress && addressSet[oldAddress] > 0) {
            addressSet[oldAddress] = addressSet[oldAddress].sub(1);
            recoverSet[friend] = newAddress;
            addressSet[newAddress] = addressSet[newAddress].add(1);

            if (addressSet[oldAddress] == 0) {
                AddressArrayUtil.remove(oldAddress, addressList);
            }

            if (addressSet[newAddress] == 1) {
                addressList.push(newAddress);
            }
        }

        // Clear address history after recover success
        if (addressSet[newAddress] >= threshold) {
            owner = newAddress;
            
            for (uint i = 0; i < addressList.length; i++) {
                addressSet[addressList[i]] = 0;
            }

            addressList.length = 0;
        }
        return true;
    }

    // TODO: Later we will make this as universal utility not only for erc20.
    // Below are erc20 methods
    // ERC20 transfer
    function transfer(address _erc20, address _to, uint256 _value) public 
        onlyOwner 
        returns (bool success)
    {
        lastOwnerAction = now;
        StagTokenInterface erc20 = StagTokenInterface(_erc20);
        return erc20.transfer(_to, _value);
    }

    // ERC20 approve
    function approve(address _erc20, address _spender, uint256 _value) public 
        onlyOwner 
        returns (bool success)
    {
        lastOwnerAction = now;
        StagTokenInterface erc20 = StagTokenInterface(_erc20);
        return erc20.approve(_spender, _value);
    }

    function addApprover(bytes32 approver) public 
        onlyOwner
        checkApproveTimeLock
        returns(bool)
    {
        lastOwnerAction = now;
        if (!approverSet[approver]) {
            approvers.push(approver);
            approverSet[approver] = true;
            approveLock += 7 days;
            return true;
        }
    }

    function removeApprover(bytes32 approver) public 
        onlyOwner
        checkApproveTimeLock  
        returns(bool)
    {
        lastOwnerAction = now;
        if (approverSet[approver]) {
            approverSet[approver] = false;
            
            ArrayUtil.remove(approver, approvers);
            approveLock += 7 days;
            return true;
        }
    }

    function setMinApprove(uint256 _minApprove) public 
        onlyOwner
        minApproveLimit(_minApprove) 
        checkApproveTimeLock 
        returns(bool)
    {
        minApprove = _minApprove;
        approveLock += 7 days;
        return true;
    }

    function transferDirectly(address _erc20, address _to, uint256 _value) public
        onlyOwner
        checkApproveTimeLock
        returns (uint256 id)
    {
        lastOwnerAction = now;
        proposalId++;
        proposals[proposalId] = Proposal({
            category: Category.Transfer,
            contractAddress: _erc20,
            beneficiary: _to,
            value: _value,
            status: Status.Pending,
            approvers: new bytes32[](0),
            minApprove: minApprove
        });
        
        return proposalId;
    }

    function approveDirectly(address _erc20, address _spender, uint256 _value) public 
        onlyOwner
        checkApproveTimeLock
        returns (uint256 id)
    {
        lastOwnerAction = now;
        proposalId++;
        proposals[proposalId] = Proposal({
            category: Category.Allowance,
            contractAddress: _erc20,
            beneficiary: _spender,
            value: _value,
            status: Status.Pending,
            approvers: new bytes32[](0),
            minApprove: minApprove
        });
        
        return proposalId;
    }

    function approve(uint256 id) public
        checkApproveTimeLock
        returns (bool)
    {
        // Only approver
        bytes32 approver = keccak256(abi.encodePacked(msg.sender, salt));
        require(approverSet[approver]);
        
        Proposal storage proposal = proposals[id];
        // Only Pending proposal
        require(proposal.status == Status.Pending);
        bool isExist;
        bytes32[] storage proposalApprovers = proposal.approvers;
        for (uint i = 0; i < approvers.length; i++) {
            if (proposalApprovers[i] == approver) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            proposalApprovers.push(approver);
        }

        if (proposalApprovers.length >= proposal.minApprove) {
            StagTokenInterface erc20 = StagTokenInterface(proposal.contractAddress);
            if (proposal.category == Category.Transfer) {
                if (erc20.transferDirectly(proposal.beneficiary, proposal.value)) {
                    proposal.status = Status.Finish;
                } else {
                    proposal.status = Status.Failed;
                }
            } else {
                if (erc20.approveDirectly(proposal.beneficiary, proposal.value)) {
                    proposal.status = Status.Finish;
                } else {
                    proposal.status = Status.Failed;
                }
            }
        }
        return true;
    }

    function transferOwnership() public returns (bool) {
        require(now > lastOwnerAction + 1000 days);
        require(beneficiary == msg.sender);
        owner = msg.sender;
    }
}
