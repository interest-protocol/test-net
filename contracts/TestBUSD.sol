//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Test net BUSD so users can test our contracts
 */
contract TestBUSD is ERC20 {
    // solhint-disable-next-line no-empty-blocks
    constructor() ERC20("Binance USDC", "BUSD") {}

    function mint(uint256 amount) external {
        require(250000 ether >= amount, "BUSD: must be less than 10");

        _mint(_msgSender(), amount);
    }
}
