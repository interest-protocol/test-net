import { ethers } from 'hardhat';

import {
  DineroFaucet,
  NFT,
  TestBTC,
  TestBUSD,
  TestCaseDePapel,
  TestDinero,
  TestInterestBNBMarket,
  TestInterestMarketV1,
  TestInterestToken,
  TestLibraryWrapper,
  TestNFTMarket,
  TestOracleV1,
  TestPancakeOracle,
  TestStakedInterestToken,
  TestWBNB,
} from '../typechain';
import {
  BURNER_ROLE,
  CHAINLINK_BNB_USD_FEED,
  GRANULARITY,
  MINTER_ROLE,
  PCS_FACTORY_ADDRESS,
  PCS_ROUTER,
  WINDOW,
} from './constants';
import { deploy, deployUUPS, logAddresses } from './utils';

const { parseEther } = ethers.utils;

async function main() {
  const [deployer] = await ethers.getSigners();

  // **** Contracts need to de deployed sequentially on Test Nets

  const testDinero: TestDinero = await deployUUPS('TestDinero', []);
  const testInterestToken: TestInterestToken = await deployUUPS(
    'TestInterestToken',
    []
  );
  const testStakedInterestToken: TestStakedInterestToken = await deployUUPS(
    'TestStakedInterestToken',
    []
  );
  const testBTC: TestBTC = await deploy('TestBTC', []);

  const testBUSD: TestBUSD = await deploy('TestBUSD', []);
  const testWBNB: TestWBNB = await deploy('TestWBNB', []);
  const nft: NFT = await deploy('NFT', []);
  const nftMarket: TestNFTMarket = await deployUUPS('TestNFTMarket', [
    deployer.address,
  ]);
  const dineroFaucet: DineroFaucet = await deploy('DineroFaucet', [
    testDinero.address,
  ]);
  const testCasaDePapel: TestCaseDePapel = await deployUUPS('TestCaseDePapel', [
    testInterestToken.address,
    testStakedInterestToken.address,
    deployer.address,
    parseEther('40'),
    17_751_164,
  ]);
  const testLibraryWrapper: TestLibraryWrapper = await deploy(
    'TestLibraryWrapper',
    []
  );
  const testPancakeOracle: TestPancakeOracle = await deployUUPS(
    'TestPancakeOracle',
    [PCS_FACTORY_ADDRESS, WINDOW, GRANULARITY, testLibraryWrapper.address]
  );
  const testOracleV1: TestOracleV1 = await deployUUPS('TestOracleV1', [
    testPancakeOracle.address,
    CHAINLINK_BNB_USD_FEED,
    testWBNB.address,
    testBUSD.address,
  ]);
  const testInterestBNBMarket: TestInterestBNBMarket = await deployUUPS(
    'TestInterestBNBMarket',
    [
      PCS_ROUTER,
      testDinero.address,
      deployer.address,
      testOracleV1.address,
      ethers.BigNumber.from(12e8),
      ethers.BigNumber.from('800000000000000000'),
      ethers.BigNumber.from('100000000000000000'),
    ]
  );
  const testInterestMarket: TestInterestMarketV1 = await deployUUPS(
    'TestInterestMarketV1',
    [
      PCS_ROUTER,
      testDinero.address,
      deployer.address,
      testOracleV1.address,
      testBTC.address,
      ethers.constants.AddressZero,
      ethers.BigNumber.from(12e8),
      ethers.BigNumber.from('800000000000000000'),
      ethers.BigNumber.from('100000000000000000'),
    ]
  );

  // ****** GIVE ROLES ******

  await testDinero
    .connect(deployer)
    .grantRole(MINTER_ROLE, dineroFaucet.address);
  await testDinero
    .connect(deployer)
    .grantRole(MINTER_ROLE, testInterestBNBMarket.address);
  await testDinero
    .connect(deployer)
    .grantRole(BURNER_ROLE, testInterestBNBMarket.address);
  await testDinero
    .connect(deployer)
    .grantRole(MINTER_ROLE, testInterestMarket.address);
  await testDinero
    .connect(deployer)
    .grantRole(BURNER_ROLE, testInterestMarket.address);
  await testInterestToken
    .connect(deployer)
    .grantRole(MINTER_ROLE, testCasaDePapel.address);
  await testStakedInterestToken
    .connect(deployer)
    .grantRole(MINTER_ROLE, testCasaDePapel.address);
  await testStakedInterestToken
    .connect(deployer)
    .grantRole(BURNER_ROLE, testCasaDePapel.address);

  // ****** SET UP Oracle ******

  await testOracleV1
    .connect(deployer)
    .setFeed(testBTC.address, '0x5741306c21795FdCBb9b265Ea0255F499DFe515C', 0);

  // ****** LOGS ******

  logAddresses([
    ['Dinero', testDinero],
    ['Interest Token', testInterestToken],
    ['Staked Interest Token', testStakedInterestToken],
    ['BTC', testBTC],
    ['WBNB', testWBNB],
    ['BUSD', testBUSD],
    ['NFT', nft],
    ['NFTMarket', nftMarket],
    ['Dinero Faucet', dineroFaucet],
    ['Casa De Papel', testCasaDePapel],
    ['Library Wrapper', testLibraryWrapper],
    ['TWAP', testPancakeOracle],
    ['OracleV1', testOracleV1],
    ['Interest BNB Market', testInterestBNBMarket],
    ['Interest BTC Market', testInterestMarket],
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
