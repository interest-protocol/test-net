//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Test net WBNB so users can test our contracts
 */
contract TestWBNB is ERC20 {
    // solhint-disable-next-line no-empty-blocks
    constructor() ERC20("Wrapped BNB", "WBNB") {}

    function mint(uint256 amount) external {
        require(25 ether >= amount, "WBNB: must be less than 10");

        _mint(_msgSender(), amount);
    }
}
