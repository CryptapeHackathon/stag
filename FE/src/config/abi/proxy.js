export default [{
  'constant': true,
  'inputs': [{'name': '', 'type': 'uint256'}],
  'name': 'proposals',
  'outputs': [{'name': 'category', 'type': 'uint8'}, {
    'name': 'contractAddress',
    'type': 'address',
  }, {'name': 'beneficiary', 'type': 'address'}, {'name': 'value', 'type': 'uint256'}, {
    'name': 'status',
    'type': 'uint8',
  }, {'name': 'minApprove', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'address'}],
  'name': 'addressSet',
  'outputs': [{'name': '', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': 'newAddress', 'type': 'address'}],
  'name': 'recover',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': '_erc20', 'type': 'address'}, {'name': '_to', 'type': 'address'}, {
    'name': '_value',
    'type': 'uint256',
  }],
  'name': 'transferDirectly',
  'outputs': [{'name': 'id', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': 'friend', 'type': 'bytes32'}],
  'name': 'addFriend',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'proposalId',
  'outputs': [{'name': '', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'threshold',
  'outputs': [{'name': '', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'bytes32'}],
  'name': 'recoverSet',
  'outputs': [{'name': '', 'type': 'address'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': 'friend', 'type': 'bytes32'}],
  'name': 'removeFriend',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'minApprove',
  'outputs': [{'name': '', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': '_minApprove', 'type': 'uint256'}],
  'name': 'setMinApprove',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'owner',
  'outputs': [{'name': '', 'type': 'address'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': 'approver', 'type': 'bytes32'}],
  'name': 'removeApprover',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': '_threshold', 'type': 'uint256'}],
  'name': 'setThreshold',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'bytes32'}],
  'name': 'approverSet',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': 'id', 'type': 'uint256'}],
  'name': 'approve',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'uint256'}],
  'name': 'addressList',
  'outputs': [{'name': '', 'type': 'address'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': '_erc20', 'type': 'address'}, {'name': '_to', 'type': 'address'}, {
    'name': '_value',
    'type': 'uint256',
  }],
  'name': 'transfer',
  'outputs': [{'name': 'success', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'salt',
  'outputs': [{'name': '', 'type': 'string'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': 'approver', 'type': 'bytes32'}],
  'name': 'addApprover',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'uint256'}],
  'name': 'friends',
  'outputs': [{'name': '', 'type': 'bytes32'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'uint256'}],
  'name': 'approvers',
  'outputs': [{'name': '', 'type': 'bytes32'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': '_erc20', 'type': 'address'}, {'name': '_spender', 'type': 'address'}, {
    'name': '_value',
    'type': 'uint256',
  }],
  'name': 'approve',
  'outputs': [{'name': 'success', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'friendsList',
  'outputs': [{'name': '', 'type': 'bytes32[]'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [{'name': '', 'type': 'bytes32'}],
  'name': 'friendSet',
  'outputs': [{'name': '', 'type': 'bool'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'constant': false,
  'inputs': [{'name': '_erc20', 'type': 'address'}, {'name': '_spender', 'type': 'address'}, {
    'name': '_value',
    'type': 'uint256',
  }],
  'name': 'approveDirectly',
  'outputs': [{'name': 'id', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'constant': true,
  'inputs': [],
  'name': 'lock',
  'outputs': [{'name': '', 'type': 'uint256'}],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{'name': '_threshold', 'type': 'uint256'}, {
    'name': '_minApprove',
    'type': 'uint256',
  }, {'name': '_friends', 'type': 'bytes32[]'}, {'name': '_approvers', 'type': 'bytes32[]'}, {
    'name': '_salt',
    'type': 'string',
  }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor',
}]