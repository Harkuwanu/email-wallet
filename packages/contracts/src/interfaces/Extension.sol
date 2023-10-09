import "./Types.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract Extension {
    /// Execute the extension logic
    /// @param templateIndex Index of the subjectTemplate to which the subject was matched
    /// @param subjectParams Array of params decoded from email subject based on the template, in the same order matchers
    /// @param wallet Address of users wallet
    /// @param hasEmailRecipient Whether the email subject has a recipient (email address)
    /// @param recipientETHAddr The ETH address of the recipient in email (if any, and hasEmailRecipient = false)
    /// @param emailNullifier Nullifier of the email
    /// @dev Implementations should not send tokens to `wallet` directly and use `EmailWalletCore.depositTokenToAccount()` instead
    /// @dev Decode {tokenAmount} in template as `abi.decode(string, uint256)` (`tokenName` and `tokenAmount`)
    function execute(
        uint8 templateIndex,
        bytes[] memory subjectParams,
        address wallet,
        bool hasEmailRecipient,
        address recipientETHAddr,
        bytes32 emailNullifier
    ) external virtual;

    /// Register unclaimed state for a recipient emailCommitment
    /// @param unclaimedState Unclaimed state that is registered
    function registerUnclaimedState(UnclaimedState memory unclaimedState) public virtual returns (bool) {
        unclaimedState;
        revert("Not implemented");
    }

    /// Claim an unclaimed state to recipient user
    /// @param unclaimedState Unclaimed state that is being claimed
    /// @param wallet Address of users wallet
    function claimUnclaimedState(UnclaimedState memory unclaimedState, address wallet) external virtual;

    /// Revert an expired inclaimed state
    /// @param unclaimedState Unclaimed state that is expired
    function revertUnclaimedState(UnclaimedState memory unclaimedState) external virtual {
        unclaimedState;
        revert("Not implemented");
    }
}