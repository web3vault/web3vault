// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract W3Vault {

    event NewVault(address addr, string pointer, uint timestamp);

    struct Vault  {
        string encryptedPointer;
        uint timestamp;
    }

    mapping (address => Vault) vaults;

    uint256  public  _count;

    function incrementCount() private returns (uint256){
        /// if vaults[msg.sender] is empty do not increment the counter _count
        if (bytes(vaults[msg.sender].encryptedPointer).length == 0) return _count;
        _count += 1;
        return _count;
    }

    /**
     * @dev This function publishes a new vault pointer associated with the caller's address.
     * It increments the count of vaults and emits an event indicating that a new vault has been published successfully.
     * @param _encryptedReference The encrypted data pointer to be stored in the vault.
     */
    function publishVault(string calldata _encryptedReference) public {
        vaults[msg.sender] = Vault(_encryptedReference, block.timestamp);
        emit NewVault(msg.sender, _encryptedReference, block.timestamp);
        incrementCount();
    }
    
    /**
     * @dev Returns the vault information for the caller.
     * @return The encrypted pointer and timestamp of the vault associated with the caller's address.
     */
    function getVault() view public returns (string memory, uint256) {
        return (vaults[msg.sender].encryptedPointer, vaults[msg.sender].timestamp);
    }
}