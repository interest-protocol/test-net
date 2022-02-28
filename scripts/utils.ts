// eslint-disable-next-line node/no-unpublished-import
import { ethers, upgrades } from 'hardhat';

export const multiDeploy = async (
  x: ReadonlyArray<string>,
  y: Array<Array<unknown> | undefined> = []
): Promise<any> => {
  const contractFactories = await Promise.all(
    x.map((name) => ethers.getContractFactory(name))
  );

  return Promise.all(
    contractFactories.map((factory, index) =>
      factory.deploy(...(y[index] || []))
    )
  );
};

export const deploy = async (
  name: string,
  parameters: Array<unknown> = []
): Promise<any> => {
  const factory = await ethers.getContractFactory(name);
  const instance = await factory.deploy(...parameters);
  await instance.deployed();
  return instance;
};

export const deployUUPS = async (
  name: string,
  parameters: Array<unknown> = []
): Promise<any> => {
  const factory = await ethers.getContractFactory(name);
  const instance = await upgrades.deployProxy(factory, parameters, {
    kind: 'uups',
  });
  await instance.deployed();
  return instance;
};

export const multiDeployUUPS = async (
  name: ReadonlyArray<string>,
  parameters: Array<Array<unknown> | undefined> = []
): Promise<any> => {
  const factories = await Promise.all(
    name.map((x) => ethers.getContractFactory(x))
  );

  const instances = await Promise.all(
    factories.map((factory, index) =>
      upgrades.deployProxy(factory, parameters[index], { kind: 'uups' })
    )
  );

  await Promise.all([instances.map((x) => x.deployed())]);

  return instances;
};
