import { ethers } from 'ethers';
import ABINFTPassFactory from '../assets/ABI/ABINFTPASSFactory.json';
import ABINFTPass from '../assets/ABI/ABINFTPASS.json';

const NFT_PASS_FACTORY_CONTRACT_ADDRESS = "0x55aDA3c97518673B2E9db327f4E2d9D220Ec23B1";

async function getProvider() {
  if (!(window as any).ethereum) {
    throw new Error("No wallet found!");
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);

  if (!accounts || !accounts.length) {
    throw new Error("Wallet not authorized!");
  }

  return provider;
}

export async function connectToNFTFactoryContract() {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(NFT_PASS_FACTORY_CONTRACT_ADDRESS, ABINFTPassFactory, provider);
    return contract;
  } catch (error) {
    throw new Error("Failed to connect to NFT Factory Contract: " + error);
  }
}

/*
export async function connectToNFTContract() {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(NFT_PASS_CONTRACT_ADDRESS, ABINFTPass, provider);
    return contract;
  } catch (error) {
    throw new Error("Failed to connect to NFT Contract: " + error);
  }
}
*/

export async function createNFTPassFactory() {
  try {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(NFT_PASS_FACTORY_CONTRACT_ADDRESS, ABINFTPassFactory, signer);

    const tx = await contract.createNFTPass('TESTE CREATE NFT PASS', 'TESTE');
    await tx.wait();

    const openEvents = await contract.getOpenEvents();
    const arrayResult = Object.values(openEvents);
    return arrayResult[arrayResult.length - 1];
  } catch (error) {
    throw new Error("Failed to create NFT Pass Factory: " + error);
  }
}

export async function getPASSInfo(contractNFTAddress: any) {
    try {
      const provider = await getProvider();
      const contract = new ethers.Contract(contractNFTAddress, ABINFTPassFactory, provider);
      const PASSInfo = await contract.getPASSInfo();
      return PASSInfo; 
    } catch (error) {
      throw new Error("Failed to get PASS info: " + error); // Lança um erro se houver falha
    }
  }
  
