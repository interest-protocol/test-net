//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Test net BTC so users can test our contracts
 */
contract TestBTC is ERC20 {
    // solhint-disable-next-line no-empty-blocks
    constructor() ERC20("Bitcoin", "BTC") {}

    function mint(uint256 amount) external {
        require(10 ether >= amount, "BTC: must be less than 10");

        _mint(_msgSender(), amount);
    }
}
