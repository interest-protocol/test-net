import { deploy, deployUUPS } from './utils';

async function main() {
  const testDinero = await deployUUPS('TestDinero', []);

  const testInterestToken = await deployUUPS('TestInterestToken', []);
  const testStakedInterestToken = await deployUUPS(
    'TestStakedInterestToken',
    []
  );
  const testBTC = await deploy('TestBTC', []);

  console.log('TestDinero deployed to:', testDinero.address);
  console.log('TestInterestToken deployed to:', testInterestToken.address);
  console.log(
    'TestStakedInterestToken deployed to:',
    testStakedInterestToken.address
  );
  console.log('TestBTC deployed to:', testBTC.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
