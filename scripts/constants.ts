import { ethers } from 'hardhat';

export const MINTER_ROLE = ethers.utils.solidityKeccak256(
  ['string'],
  ['MINTER_ROLE']
);
export const DEVELOPER_ROLE = ethers.utils.solidityKeccak256(
  ['string'],
  ['DEVELOPER_ROLE']
);
export const BURNER_ROLE = ethers.utils.solidityKeccak256(
  ['string'],
  ['BURNER_ROLE']
);

export const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero;

export const WINDOW = 86_400; // 24 hours - 60 * 60 * 24

export const GRANULARITY = 4;

// https://twitter.com/pancakeswap/status/1369547285160370182?lang=en
export const PCS_FACTORY_ADDRESS = '0x6725F303b657a9451d8BA641348b6761A6CC7a17';

// https://twitter.com/pancakeswap/status/1369547285160370182?lang=en
export const PCS_ROUTER = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1';

// https://docs.chain.link/docs/bnb-chain-addresses/
export const CHAINLINK_BNB_USD_FEED =
  '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526';
