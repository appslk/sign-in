import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi'
import { base } from 'wagmi/chains';
//import { mainnet } from 'wagmi/chains'

//CHANGE THE NETWORK TO MAINNET WHEN ON THE HOME.JS

const chains = [base]
const projectId = '1ee662092220d9e279a243cd7270bbae'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
    <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient}></Web3Modal>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
