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

    
    /**
     * @dev This internal function increments the count of vaults and returns the new value if a new vault has been published successfully. 
     * If the caller's address does not have an existing vault, the function simply returns the current count without incrementing it.
     * @return The new count after potential incrementation.
     */
    function incrementCount() private returns (uint256){
        if (vaults[msg.sender].timestamp == 0) {
            _count += 1;
        } 
        return _count;
    }

    /**
     * @dev This function publishes a new vault pointer associated with the caller's address.
     * It increments the count of vaults and emits an event indicating that a new vault has been published successfully.
     * @param _encryptedReference The encrypted data pointer to be stored in the vault.
     */
    function publishVault(string calldata _encryptedReference) public {
        incrementCount();
        vaults[msg.sender] = Vault(_encryptedReference, block.timestamp);
        emit NewVault(msg.sender, _encryptedReference, block.timestamp);
    }
    
    /**
     * @dev Returns the vault information for the caller.
     * @return The encrypted pointer and timestamp of the vault associated with the caller's address.
     */
    function getVault() view public returns (string memory, uint256) {
        return (vaults[msg.sender].encryptedPointer, vaults[msg.sender].timestamp);
    }
}