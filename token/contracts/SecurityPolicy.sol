pragma solidity ^0.4.19;

import "./SafeMath.sol";

contract SecurityPolicy {

    using SafeMath for uint256;

    struct PeriodicPolicy {
        uint256 amount;
        uint256 count;
        uint256 interval;
    }

    struct TransferRecord {
        uint256 amount;
        uint256 timestamp;
    }

    uint256 private defaultAmount;
    uint256 private defaultCount;
    uint256 private defaultInterval;
    uint256 private maxAmount;
    uint256 private maxCount;
    uint256 private maxInterval;
    uint256 private minAmount;
    uint256 private minCount;
    uint256 private minInterval;
    uint256 private maxRecordsCount;
    mapping(address => PeriodicPolicy) private policies;
    mapping(address => TransferRecord[]) private allRecords;

    function SecurityPolicy() public {
        defaultAmount = 1000;
        defaultCount = 10;
        defaultInterval = 86400;
        minAmount = 100;
        minCount = 1;
        minInterval = 3600;
        maxAmount = 10000;
        maxCount = 100;
        maxInterval = 2419200;
        maxRecordsCount = 500;
    }

    modifier checkPolicy(address _sender, uint256 _value) {
        PeriodicPolicy storage policy = policies[_sender];
        if (policy.amount == 0 && policy.count == 0 && policy.interval == 0) {
                policy.amount = defaultAmount;
                policy.count = defaultCount;
                policy.interval = defaultInterval;
        }
        uint256 begin = now.sub(policy.interval);
        uint256 amount;
        uint256 count;
        (amount, count) = cleanRecords(_sender, begin);
        amount = amount.add(_value);
        require(policy.amount >= amount);
        require(policy.count > count);
        addRecord(_sender, _value);
        _;
    }

    function cleanRecords(address _sender, uint256 begin) private returns(uint256 amount, uint256 count) {
        TransferRecord[] storage records = allRecords[_sender];
        if (records.length == 0) {
            return;
        }
        uint256 j = records.length.sub(1);
        for (uint256 i = 0; i <= j; i++) {
            if (records[i].timestamp < begin) {
                while (records[j].timestamp < begin) {
                    j -= 1;
                    if (i == j) { break; }
                }
                if (i == j) { break; }
                records[i] = records[j];
            }
            amount.add(records[i].amount);
            count.add(1);
        }
        records.length = count;
        require(records.length <= maxRecordsCount);
    }

    function addRecord(address _sender, uint256 _value) private {
        TransferRecord[] storage records = allRecords[_sender];
        require(records.length <= maxRecordsCount);
        records[records.length].amount = _value;
        records[records.length].timestamp = now;
    }

    function lastRecordTimestamp(address _sender) view public returns(uint timestamp) {
        TransferRecord[] storage records = allRecords[_sender];
        if (records.length == 0) {
            return;
        }
        for (uint256 i = 0; i < records.length; i++) {
            if (records[i].timestamp > timestamp) {
                timestamp = records[i].timestamp;
            }
        }
    }

    function updatePolicy(address _sender, uint256 _amount, uint256 _count, uint256 _interval) public returns (bool success){
        require(_amount >= minAmount && _amount <= maxAmount);
        require(_count >= minCount && _count <= maxCount);
        require(_interval >= minInterval && _interval <= maxCount);
        PeriodicPolicy storage policy = policies[_sender];
        policy.amount = _amount;
        policy.count = _count;
        policy.interval = _interval;
        return true;
    }
}
