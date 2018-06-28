pragma solidity ^0.4.19;

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

contract Proxy {
    using ArrayUtil for ArrayUtil;

    address public owner;
    bytes32[] public friends;
    // sha3(address) for safety
    mapping(bytes32 => bool) public friendSet;
    uint public threshold;
    mapping(bytes32 => address) public recoverSet;
    mapping(address => uint) public pointSet;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function Proxy(uint _threshold) public {
        owner = msg.sender;
        threshold = _threshold;
    }

    function addFriend(bytes32 friend) public onlyOwner returns(bool) {
        if (!friendSet[friend]) {
            friends.push(friend);
            friendSet[friend] = true;
        }
    }

    function removeFriend(bytes32 friend) public onlyOwner returns(bool) {
        if (friendSet[friend]) {
            friendSet[friend] = false;
            
            ArrayUtil.remove(friend, friends);
            return true;
        }
    }
 
    function recover(address newAddress) public returns(bool) {
        bytes32 friend = keccak256(msg.sender);
        require(friendSet[friend]);
        if (recoverSet[friend] != newAddress && pointSet[recoverSet[friend]] > 0) {
            pointSet[recoverSet[friend]] -= 1;
            recoverSet[friend] = newAddress;
            pointSet[newAddress] += 1;
        }

        if (pointSet[newAddress] >= threshold) {
            owner = newAddress;
            // TODO: Clear recoverSet and pointSet
        }
    }
}
