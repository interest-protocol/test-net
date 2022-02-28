//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@interest-protocol/contracts/tokens/Dinero.sol";

contract DineroFaucet {
    //solhint-disable-next-line var-name-mixedcase
    Dinero public immutable DINERO;

    constructor(Dinero _dinero) {
        DINERO = _dinero;
    }

    function mint(uint256 amount) external {
        require(250000 ether >= amount, "FC: amount too high");
        DINERO.mint(msg.sender, amount);
    }
}
