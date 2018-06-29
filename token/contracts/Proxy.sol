pragma solidity ^0.4.19;
import "./SafeMath.sol";

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
    bytes32[] public friends;
    // sha3(address) for safety
    mapping(bytes32 => bool) public friendSet;
    uint256 public threshold;
    mapping(bytes32 => address) public recoverSet;
    mapping(address => uint256) public addressSet;
    address[] public addressList;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function Proxy(uint256 _threshold) public {
        require(_threshold >= 3);

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

    function setThreshold(uint256 _threshold) public onlyOwner returns(bool) {
        require(_threshold > 3);
        threshold = _threshold;
    }
 
    function recover(address newAddress) public returns(bool) {
        bytes32 friend = keccak256(msg.sender);
        address oldAddress = recoverSet[friend];
        require(friendSet[friend]);
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
    }
}
