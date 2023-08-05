// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ZToken is ERC1155 {
    bytes32 public rootHash;

    constructor(bytes32 _rootHash) ERC1155("") {
        rootHash = _rootHash;
    }

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data,
        bytes32[] calldata proof
    ) public {
        require(verify(account, proof), "Address is not whitelisted");
        _mint(account, id, amount, data);
    }

    function verify(address account, bytes32[] calldata proof) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return MerkleProof.verify(proof, rootHash, leaf);
    }
}
