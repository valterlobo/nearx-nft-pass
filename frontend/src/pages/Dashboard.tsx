import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import { Alchemy, Network } from "alchemy-sdk";
import MetaMaskService from '../services/MetaMaskService';

import ABINFTPassFactory from '../assets/ABI/ABINFTPASSFactory.json';
import ABINFTPass from '../assets/ABI/ABINFTPASS.json';

import { ethers } from 'ethers';

const Dashboard: React.FC = () => {

  const NFT_PASS_FACTORY_CONTRACT_ADDRESS = "0x55aDA3c97518673B2E9db327f4E2d9D220Ec23B1";
  const NFT_PASS_CONTRACT_ADDRESS = "0x1D20e8dCBAA37d55F79622ba6DA1EeE140185E95";

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

  useEffect(() => {

    async function connectToContract() {
      
      try {
        const provider = await getProvider();
        const contract = new ethers.Contract(NFT_PASS_FACTORY_CONTRACT_ADDRESS, ABINFTPassFactory, provider);

        const openEvents = await contract.getOpenEvents();

        console.log(openEvents);

      } catch (error) {
        console.log(error);
      }
    }
    connectToContract();
    connectToNFTPass();
  }, []);


  async function connectToNFTPass() {
      try {
        const provider = await getProvider();
        const contract = new ethers.Contract("0xD1BD6caf7354e5e8876A1263A3a3D8621f7abc35", ABINFTPass, provider);

        /*
        const symbol = await contract.symbol();
        const name = await contract.name();
        console.log("Symbol: ", symbol);
        console.log("Name: ", name);

        const contractURI = await contract.contractURI();
        console.log("Contract URI: ", contractURI);
        */

        const PASSInfo = await contract.getPASSInfo();
        console.log('PASSInfo: ', PASSInfo);

        // Acessando elementos individuais do array
          const title = PASSInfo[0];
          const description = PASSInfo[1];
          const startDate = PASSInfo[2];
          const endDate = PASSInfo[3];
          const startTime = PASSInfo[4];
          const endTime = PASSInfo[5];
          const liveDescription = PASSInfo[6];
          const host = PASSInfo[7];
          const imageURI = PASSInfo[8];
          const platform = PASSInfo[9];
          const platformLink = PASSInfo[10];

          console.log('Title:', title);
          console.log('Description:', description);
          console.log('Start Date:', startDate);
          console.log('End Date:', endDate);
          console.log('Start Time:', startTime);
          console.log('End Time:', endTime);
          console.log('Live Description:', liveDescription);
          console.log('Host:', host);
          console.log('Image URI:', imageURI);
          console.log('Platform:', platform);
          console.log('Platform Link:', platformLink);

      } catch (error) {
        console.log(error);
      }
  }

  async function createNFTPassFactory() {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(NFT_PASS_FACTORY_CONTRACT_ADDRESS, ABINFTPassFactory, signer);

        const tx = await contract.createNFTPass('TESTE CREATE NFT PASS','TESTE');
        await tx.wait();

        const openEvents = await contract.getOpenEvents();
        const arrayResult = Object.values(openEvents);
        const ultimoValor = arrayResult[arrayResult.length - 1];
        console.log('ultimo valor adicionado:', ultimoValor);
        
        // connectToNFTPass(ultimoValor);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="dashboard">
      <h2>Meus NFTs</h2>
      <button onClick={createNFTPassFactory}>Create NFT Factory</button>
      <div className="nft-list">
        
      </div>
    </div>
  );
} 

export default Dashboard;
