//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _id;

    //solhint-disable-next-line no-empty-blocks
    constructor() ERC721("Crypto Punks", "PUNK") {}

    function mint() external {
        _id.increment();
        _safeMint(msg.sender, _id._value);
    }
}
