/* eslint-disable no-undef */
import '../App.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Web3Button, Web3Modal, useWeb3Modal } from '@web3modal/react';
import { mainnet, useDisconnect, useAccount, useContractRead, useContractReads, useContractWrite, useNetwork, usePublicClient, useSwitchNetwork, useWaitForTransaction, useSignMessage } from 'wagmi';
import { createPublicClient, formatEther, http, parseEther, webSocket } from 'viem';
import { pulsechainV4, base } from 'wagmi/chains';
import Web3_mm from 'web3';
import Web3_1155 from 'web3';
import axios from 'axios';
import scanner_1 from '../assets/CarroTechScannerUI/IMG_1554.PNG';
import scanner_1_mob from '../assets/CarroTechScannerUI/IMG_3317.PNG';
import scanner_2 from '../assets/CarroTechScannerUI/IMG_3316.PNG';
import scanner_2_mob from '../assets/CarroTechScannerUI/IMG_3318.PNG';
import scanner_success from '../assets/CarroTechScannerUI/IMG_3320.PNG';
import scanner_success_mob from '../assets/CarroTechScannerUI/IMG_3315.PNG';
import scanner_error from '../assets/CarroTechScannerUI/IMG_3319.png';
import scanner_error_mob from '../assets/CarroTechScannerUI/IMG_3321.png';

const ops = () => {
	window.open("#");
}

let ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_funderWallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_maxSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nftCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gameNFTPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "networkChainId",
				"type": "uint256"
			},
			{
				"internalType": "uint96",
				"name": "feeNumerator",
				"type": "uint96"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numerator",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "denominator",
				"type": "uint256"
			}
		],
		"name": "ERC2981InvalidDefaultRoyalty",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC2981InvalidDefaultRoyaltyReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numerator",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "denominator",
				"type": "uint256"
			}
		],
		"name": "ERC2981InvalidTokenRoyalty",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC2981InvalidTokenRoyaltyReceiver",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ERC721EnumerableForbiddenBatchMint",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "ERC721OutOfBoundsIndex",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ToggleGameMintSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ToggleMintSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "userAddress",
				"type": "address[]"
			}
		],
		"name": "airdropNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "easyModeGamePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintQuantity",
				"type": "uint256"
			}
		],
		"name": "estimateForFixPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_mintModeType",
				"type": "uint256"
			}
		],
		"name": "estimateForGame",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "funderWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameMintTime",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameNFTCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hardModeGamePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isGameMintActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isMartekplaceBlacklist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isMintActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintQuantity",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mintMode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mintTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "validateSignature",
				"type": "bytes"
			}
		],
		"name": "mintForGame",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "notRevealedUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintQuantity",
				"type": "uint256"
			}
		],
		"name": "ownerMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_marketplaceAddress",
				"type": "address"
			}
		],
		"name": "removeBlacklistMarketplace",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "reveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "revealed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "salePrice",
				"type": "uint256"
			}
		],
		"name": "royaltyInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_marketplaceAddress",
				"type": "address"
			}
		],
		"name": "setBlacklistMarketplace",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractURI",
				"type": "string"
			}
		],
		"name": "setContractURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newCost",
				"type": "uint256"
			}
		],
		"name": "setCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint96",
				"name": "feeNumerator",
				"type": "uint96"
			}
		],
		"name": "setDefaultRoyalty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_easyModePercent",
				"type": "uint256"
			}
		],
		"name": "setEasyModePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newGameNFTCost",
				"type": "uint256"
			}
		],
		"name": "setGameNFTCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_hardModePercent",
				"type": "uint256"
			}
		],
		"name": "setHardModePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxSupply",
				"type": "uint256"
			}
		],
		"name": "setMaxSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_notRevealedURI",
				"type": "string"
			}
		],
		"name": "setNotRevealedURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleGameMintSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleMintSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleNonReveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalNftMinted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "validateWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mintMode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mintTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "validateSignature",
				"type": "bytes"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let address = "0x494702c6317F049dFEF9235D29D5A5FB62FD271a";

let ABIArmoury = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "addWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "receiver",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "id",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "quantity",
				"type": "uint256[]"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "OperatorNotAllowed",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "traitIds",
				"type": "uint256[]"
			}
		],
		"name": "degradeTraits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deleteDefaultRoyalty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "incrementId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "mintBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "mintOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "removeWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "resetTokenRoyalty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractURI",
				"type": "string"
			}
		],
		"name": "setContractURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "_feeNumerator",
				"type": "uint96"
			}
		],
		"name": "setDefaultRoyalty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_max_ids",
				"type": "uint256"
			}
		],
		"name": "setMax_ids",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_max_per_wallet",
				"type": "uint256"
			}
		],
		"name": "setMax_per_wallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newSymbol",
				"type": "string"
			}
		],
		"name": "setNameAndSymbol",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "setPublicSaleCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "_royaltyFeesInBips",
				"type": "uint96"
			}
		],
		"name": "setRoyaltyInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "_feeNumerator",
				"type": "uint96"
			}
		],
		"name": "setTokenRoyalty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "traitIds",
				"type": "uint256[]"
			}
		],
		"name": "setUpgradedTraits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newuri",
				"type": "string"
			}
		],
		"name": "setURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggle_free_mint_status",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggle_public_mint_status",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "WalletAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "WalletRemoved",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nftId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "traitId",
				"type": "uint256"
			}
		],
		"name": "upgradeTraitsByUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "callbackGasLimit",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "exists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "free_mint_status",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "freeMinted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUpgradedTraits",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "wallets",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "getUserByUsername",
		"outputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "wallets",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "traitId",
				"type": "uint256"
			}
		],
		"name": "isTraitUpgraded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nftId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "traitId",
				"type": "uint256"
			}
		],
		"name": "isTraitUpgradedOfTheNftId",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastRandomNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastRequestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_ids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_per_wallet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mintingAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "MintingQuantity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numWords",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OPERATOR_FILTER_REGISTRY",
		"outputs": [
			{
				"internalType": "contract IOperatorFilterRegistry",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "premiumPercentageLink",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "premiumPercentageNative",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "public_mint_status",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicSaleCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomResult",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestConfirmations",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_salePrice",
				"type": "uint256"
			}
		],
		"name": "royaltyInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "upgradedTraitsArray",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "upgradedTraitsMap",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "usernameToUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userTraitUpgrades",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "walletToUsername",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let addressArmoury = "0xf18A312cEC54398df00636Ef852C96982D024d88";

const maxSupply = 555;

const contractLink = () => {
	window.open("https://opensea.io/collection/robbotic-rabbit-armoury-2");
}

const Carrotech = () => {

	const { open } = useWeb3Modal()
	const { chain } = useNetwork()
	const { switchNetwork } = useSwitchNetwork()

	const { address: walletAddress } = useAccount({
		async onConnect() {
			handleConnect()
		}
	})

	//const transport = webSocket(websocketUrl);

	const transport = webSocket('wss://mainnet.infura.io/ws/v3/50597910853247b38793be4ec6b05dc8')
	const web3_mm = new Web3_mm(Web3_mm.givenProvider || 'https://mainnet.infura.io/v3/50597910853247b38793be4ec6b05dc8');

	const web3_1155 = new Web3_1155(Web3_1155.givenProvider || 'https://base-mainnet.infura.io/v3/50597910853247b38793be4ec6b05dc8');
	//const web3_1155 = new Web3_1155(Web3_1155.givenProvider || 'https://polygon-mainnet.infura.io/v3/9aad89c8e515457ab8b7805f5da593ea');

	const publicClient = createPublicClient({
		chain: pulsechainV4, base,
		transport,
	})

	const [_totalSupply, settotalSupply] = useState(0);
	const [statusError, setstatusError] = useState("");
	const [showErrorDiv, setshowErrorDiv] = useState("");
	const [statusLoading, setstatusLoading] = useState("");
	const [success, setsuccess] = useState("");

	const [nftMintingAmount, setnftMintingAmount] = useState(1)
	const [_publicMintMsg, set_publicMintMsg] = useState("Mint Here")
	const [_cost, set_publicSaleCost] = useState("")
	const [_max_per_wallet, set_max_per_wallet] = useState(1)
	const [_owner, set_owner] = useState("")
	const [myNFTWallet, setmyNFTWallet] = useState(0)
	const [_public_mint_status, set_public_mint_status] = useState("")
	const [_MAX_SUPPLY, set_MAX_SUPPLY] = useState("")
	const [_connected, setConnected] = useState(false)
	const { disconnect } = useDisconnect();
	const [_tokenArray, setTokenArray] = useState([]);
	const [_weaponDiv, setWeaponDiv] = useState(false);
	const [_popDivOpen, setPopDivOpen] = useState(false);
	const [specialPower, setSpecialPower] = useState("");
	const [_drone, setDrone] = useState("");
	const [weaponsAndGear, setWeaponsAndGear] = useState("");
	const [error, setError] = useState(null);
	const [_mintingWeapon, setMintingWeapon] = useState();
	const [_mintingSpecial, setMintingSpecial] = useState();
	const [_mintingDrones, setMintingDrones] = useState();
	const [_storedTokenId, setStoredTokenId] = useState();
	const [_selectedTokenId, setSelectedTokenId] = useState();
	const [_loadingNfts, setLoadingNfts] = useState(0);
	const [_mintingWeaponLength, setMintingWeaponLength] = useState(0);
	const [_mintingSpecialLength, setMintingSpecialLength] = useState(0);
	const [_mintingDronesLength, setMintingDronesLength] = useState(0);
	const [_loadingImgs, setLoadingImgs] = useState(0);
	const [_loadingImgsBtn, setLoadingImgsBtn] = useState(0);

	const [_loadingImgs2, setLoadingImgs2] = useState(0);
	const [_tokenArray_1155, setTokenArray_1155] = useState([]);
	const [_choiceIndex, setChoiceIndex] = useState();
	const [_chooseIndexer, setChooseIndexer] = useState();
	const [isClicked, setIsClicked] = useState(false);
	const [selectedToken, setSelectedToken] = useState(null);

	const [_successMsg, setSuccessMsg] = useState(0);
	const [_errorMsg, setErrorMsg] = useState(0);
	const [_successMsg_remove, setSuccessMsg_remove] = useState(0);
	const [_errorMsg_remove, setErrorMsg_remove] = useState(0);
	const [_msg_loading, setMsg_loading] = useState(0);
	const [_response, setResponse] = useState(0);
	const [_responseUpdated, setResponseUpdated] = useState(0);
	const [_showElements, setShowElements] = useState(0);
	const [showPopup, setShowPopup] = useState(false);
	const [_viewNFTImg, setViewNFTImg] = useState('');

	const { signMessageAsync } = useSignMessage();

	const [imageUrls, setImageUrls] = useState({});
	const [traitIdList, setTraitIdList] = useState([]);
	const [weaponArray, setWeapondList] = useState([]);
	const [armoryList, setArmoryList] = useState([]);

	const [_satusLoadTilImg, setStatusLoadTilImg] = useState(0);
	const [_setTotalIds, setTotalIds] = useState(0);
	const [_setmyNFTs, setmyNFTs] = useState(0);

	const [currentImage, setCurrentImage] = useState('scanner_1');
	const [checkBalance, setCheckBalance] = useState(null);
	const [isMobile, setIsMobile] = useState(false);

	const [status, setStatus] = useState("");
	const [imageUrl, setImageUrl] = useState(null);
	const [_showImg, setShowImg] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [loadingImg, setLoadingImg] = useState(false); // Track loading state
	const [_upgradedTraitDetails, setUpgradedTraitDetails] = useState(false); // Track loading state
	const [_upgradedTraitDetails2, setUpgradedTraitDetails2] = useState(false); // Track loading state
	const [isScannerActive, setIsScannerActive] = useState(false); // Start with scanner active
	const [showDetails, setShowDetails] = useState(false); // Track when to show details
	const [fadeOut, setFadeOut] = useState(false); // Track fade-out effect
	const [_showAllArmories, setShowAllArmories] = useState(0); // Track fade-out effect


	const contract_1155 = new web3_1155.eth.Contract(ABIArmoury, addressArmoury);
	//const Web3 = require('web3'); 
	//const web3 = new Web3(window.ethereum); // Use MetaMask's provider


	const generateFinalImage = (imageUrls) => {
		if (imageUrls.length === 0) {
			console.error("No images provided.");
			return;
		}

		const canvas = document.createElement('canvas'); // Create a canvas dynamically
		const ctx = canvas.getContext('2d');

		const images = [];
		let loadedImagesCount = 0;

		// Load all images before drawing
		imageUrls.forEach((url, index) => {
			const img = new Image();
			img.src = url;
			img.crossOrigin = "anonymous"; // Ensures cross-origin images can be loaded properly
			img.onload = () => {
				images[index] = img;
				loadedImagesCount++;

				// When all images are loaded, draw them
				if (loadedImagesCount === imageUrls.length) {
					combineImages(images);
				}
			};
		});

		// Function to draw images in order
		function combineImages(images) {
			// Use the first image to set canvas size
			canvas.width = images[0].width;
			canvas.height = images[0].height;

			// Draw images in the correct order
			images.forEach((image) => {
				ctx.drawImage(image, 0, 0);
			});

			// Convert to PNG and display it
			const finalImageUrl = canvas.toDataURL('image/png');
			displayFinalImage(finalImageUrl);
		}

		// Function to set the final image in the popup
		function displayFinalImage(finalImageUrl) {
			const finalImageElement = document.getElementById('finalImage');
			if (finalImageElement) {
				finalImageElement.src = finalImageUrl;
			} else {
				console.error("Image element not found.");
			}
		}
	};

	const handleViewClick = () => {
		//setImageUrl(`https://robotic-rabbit-metadata-live-replica05.s3.us-east-2.amazonaws.com/${tokenId}.png`);
		setImageUrl(true);
	};

	const handleViewClickNFTs = async () => {

		setShowAllArmories(1);
		setLoadingNfts(1);

		await fetch1155NFTs(3);

		setLoadingNfts(0);

	};

	const closePopup = () => {
		setImageUrl(null);
	};

	useEffect(() => {
		const eventSource = new EventSource("https://roboticrabbitsyndicate.io/api/events");

		eventSource.onmessage = (event) => {
			setStatus(event.data);
		};

		eventSource.onerror = (error) => {
			console.error('SSE Error:', error);
			// Optional: Reconnect logic
			eventSource.close();
			setTimeout(() => {
				// Reconnect after delay
				setStatus("Loading & Reconnecting...");
				// Consider re-initializing the EventSource here
			}, 3000);
		};

		fetchTraitList();
		fetchWeaponList();
		fetchArmoryList();

		return () => {
			eventSource.close();
		};

	}, []);

	async function fetchTraitList() {
		try {
			const getTraitIdList = await axios.get('https://roboticrabbitsyndicate.io/api/traits');
			setTraitIdList(getTraitIdList.data);
			console.log("getTraitIdList : " + JSON.stringify(getTraitIdList.data));
		} catch (err) {
			console.log(err);
		}
	}

	async function fetchWeaponList() {
		try {
			const getWeapondList = await axios.get('https://roboticrabbitsyndicate.io/api/weapons');
			setWeapondList(getWeapondList.data);
			console.log("getWeapondList : " + JSON.stringify(getWeapondList.data));
		} catch (err) {
			console.log(err);
		}
	}

	async function fetchArmoryList() {
		try {
			const getArmoryList = await axios.get('https://roboticrabbitsyndicate.io/api/armories');
			setArmoryList(getArmoryList.data);
			console.log("getArmoryList : " + JSON.stringify(getArmoryList.data));
		} catch (err) {
			console.log(err);
		}
	}

	const setWeaponDivOpen = (tkId) => {
		fetch(`https://robotic-rabbit-metadata-live-replica05.s3.us-east-2.amazonaws.com/${tkId}.json?t=${Date.now()}`,
			{ cache: "no-store" } // Ensures fresh fetch
		)

			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				const specialPowerTrait = data.attributes.find(
					(attr) => attr.trait_type === "Special Power"
				);

				const weaponsAndGearTrait = data.attributes.find(
					(attr) => attr.trait_type === "Weapons and Gear"
				);

				const droneTrait = data.attributes.find(
					(attr) => attr.trait_type === "Drone"
				);

				setSpecialPower(specialPowerTrait ? specialPowerTrait.value : "Not found");
				setWeaponsAndGear(weaponsAndGearTrait ? weaponsAndGearTrait.value : "Not found");
				setDrone(droneTrait ? droneTrait.value : "Not found");
				console.log("data.image : " + data.image);
				setViewNFTImg(data.image);

				// Check if the "Weapons and Gear" trait contains multiple values and split them
				//const weaponValues = weaponsAndGearTrait ? weaponsAndGearTrait.value.split(',') : [];
				const weaponValues = weaponsAndGearTrait?.value ? weaponsAndGearTrait.value.split(',') : [];

				console.log("--------------weaponValues---------- :" + weaponValues);

				// Find matching indices for all weapon values
				const matchingIndices = weaponValues
					.map((weaponValue) => {
						// Trim extra spaces and check for matching indices
						return weaponArray
							.map((weapon, index) => weapon.includes(weaponValue.trim()) ? index : -1)
							.filter(index => index !== -1); // Filter out -1 (no match)
					})
					.flat(); // Flatten the result to get a single array of indices


				// Check if the "Weapons and Gear" trait contains multiple values and split them
				//const specialPowerValues = specialPowerTrait ? specialPowerTrait.value.split(',') : [];
				const specialPowerValues = specialPowerTrait?.value ? specialPowerTrait.value.split(',') : [];

				console.log("--------------specialPowerValues---------- :" + specialPowerValues);

				// Find matching indices for all weapon values
				const matchingIndices_special = specialPowerValues
					.map((specialValue) => {
						// Trim extra spaces and check for matching indices
						return weaponArray
							.map((weapon, index) => weapon.includes(specialValue.trim()) ? index : -1)
							.filter(index => index !== -1); // Filter out -1 (no match)
					})
					.flat(); // Flatten the result to get a single array of indices

				// Check if the "Weapons and Gear" trait contains multiple values and split them
				//const droneValues = droneTrait ? droneTrait.value.split(',') : [];
				const droneValues = droneTrait?.value ? droneTrait.value.split(',') : [];

				//const droneValues = droneTrait?.value ? [droneTrait.value] : [];
				console.log("--------------droneValues---------- :" + droneValues);



				// Find matching indices for all weapon values
				const matchingIndices_drone = droneValues
					.map((droneValue) => {
						// Trim extra spaces and check for matching indices
						return weaponArray
							.map((weapon, index) => weapon.includes(droneValue.trim()) ? index : -1)
							.filter(index => index !== -1); // Filter out -1 (no match)
					})
					.flat(); // Flatten the result to get a single array of indices



				console.log("Matching weapon indices:", matchingIndices); // Log all matching indices
				console.log("Matching special indices:", matchingIndices_special); // Log all matching indices
				console.log("Matching drone indices:", matchingIndices_drone); // Log all matching indices

				setMintingWeapon(matchingIndices);
				setMintingWeaponLength(matchingIndices.length);

				setMintingSpecial(matchingIndices_special);
				setMintingSpecialLength(matchingIndices_special.length);

				setMintingDrones(matchingIndices_drone);
				setMintingDronesLength(matchingIndices_drone.length);

			})
			.catch((err) => setError(err.message));

		setSelectedTokenId(tkId);
		setWeaponDiv(true); // Open the div only if it's not already open

	};

	const weaponDivClose = () => {
		setWeaponDiv(false);
	}

	const closeBtn = () => {
		window.location.reload(true);
	}

	const showElements = () => {
		setShowElements(1);
		fetch1155NFTs(3);
	}

	const closeBtn2 = () => {
		setErrorMsg(0);
		setErrorMsg_remove(0);
		setShowAllArmories(0);
	}

	const contract = {
		address: address,
		abi: ABI
	}

	const contractArmoury = {
		address: addressArmoury,
		abi: ABIArmoury
	}

	useEffect(() => {
		const fetchImages = async () => {
			const urls = {};
			await Promise.all(
				_tokenArray.map(async (tokenId) => {
					try {
						const response = await fetch(
							`https://robotic-rabbit-metadata-live-replica05.s3.us-east-2.amazonaws.com/${tokenId}.json?t=${Date.now()}`,
							{ cache: "no-store" }
						);
						if (!response.ok) {
							throw new Error(`Error fetching metadata for token ${tokenId}`);
						}
						const data = await response.json();
						urls[tokenId] = `${data.image}?t=${Date.now()}`;
					} catch (error) {
						console.error(`Failed to load image for token ${tokenId}`, error);
						urls[tokenId] = "fallback-image-url.png";
					}
				})
			);
			setImageUrls(urls);
		};

		fetchImages();
	}, [_tokenArray]);

	async function removeTrait_Drn() {

		console.log("1")

		//await switchChainToPoly();

		console.log("2")

		setConnected(true);

		setMsg_loading(1);

		console.log("_mintingSpecial_mint: " + _mintingSpecial);
		console.log("selectedTokenId_server: " + _selectedTokenId);
		console.log("_mintingSpecial_mint_toString: " + _mintingSpecial.toString());

		try {
			const response = await axios.post('https://roboticrabbitsyndicate.io/api/removeDrone', {
				selectedTokenId_server: Number(_selectedTokenId),
				mintingSpecial_server: _mintingDrones,
				selectededNetwork: 8453,
				userAddress: walletAddress,
				RECEIVED_DRONE_VALUE: _mintingDrones
			}
				, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

			//console.log(response.data);
			//console.log(response.data);
			if (response.data = "CS_SPOkay") {
				setMsg_loading(0);
				setSuccessMsg_remove(1);
				setStatus("Process Completed!");

				//await new Promise(resolve => setTimeout(resolve, 4000));
				//window.location.reload(true);
				setErrorMsg_remove(0);
				console.log("notification_sp: " + response.data);
				setResponseUpdated(1);

			} else {
				//alert("Burning error");
				setMsg_loading(0);
				setErrorMsg_remove(1);
				setSuccessMsg_remove(0);
				console.log("notification_sp: " + response.data);
				setResponseUpdated(1);
			}

		} catch (err) {
			console.log(err);
			//console.log("notification_sp: " + err.response.data);
			setMsg_loading(0);
			setErrorMsg_remove(1);
			setSuccessMsg_remove(0);
		}

	}

	async function removeTrait_SP() {

		console.log("1")

		//await switchChainToPoly();

		console.log("2")

		setConnected(true);

		setMsg_loading(1);

		console.log("_mintingSpecial_mint: " + _mintingSpecial);
		console.log("_mintingSpecial_mint_toString: " + _mintingSpecial.toString());

		try {
			const response = await axios.post('https://roboticrabbitsyndicate.io/api/changeSyndicateMetadata_SP', {
				selectedTokenId_server: Number(_selectedTokenId),
				mintingSpecial_server: _mintingSpecial,
				selectededNetwork: 8453,
				userAddress: walletAddress
			}
				, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

			//console.log(response.data);
			//console.log(response.data);
			if (response.data = "CS_SPOkay") {
				setMsg_loading(0);
				setSuccessMsg_remove(1);
				setStatus("Process Completed!");
				//await new Promise(resolve => setTimeout(resolve, 4000));
				//window.location.reload(true);
				setErrorMsg_remove(0);
				console.log("notification_sp: " + response.data);
				setResponseUpdated(1);

			} else {
				//alert("Burning error");
				setMsg_loading(0);
				setErrorMsg_remove(1);
				setSuccessMsg_remove(0);
				console.log("notification_sp: " + response.data);
				setResponseUpdated(1);
			}

		} catch (err) {
			console.log(err);
			//console.log("notification_sp: " + err.response.data);
			setMsg_loading(0);
			setErrorMsg_remove(1);
			setSuccessMsg_remove(0);
		}

	}

	async function removeTrait_WG() {

		console.log("1")

		//await switchChainToPoly();

		console.log("2")

		setConnected(true);

		setMsg_loading(1);

		console.log("_mintingWeapon_mint: " + _mintingWeapon);
		console.log("_mintingWeapon_mint_toString: " + _mintingWeapon.toString());

		try {

			const response = await axios.post('https://roboticrabbitsyndicate.io/api/changeSyndicateMetadata_WG', {
				selectedTokenId_server: Number(_selectedTokenId),
				mintingWeapon_server: _mintingWeapon,
				selectededNetwork: 8453,
				userAddress: walletAddress
			}
				, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

			//console.log(response.data);
			if (response.data == "CS_WGOkay") {
				setMsg_loading(0);

				setSuccessMsg_remove(1);
				setStatus("Process Completed!");

				setErrorMsg_remove(0);
				//await new Promise(resolve => setTimeout(resolve, 4000));
				//window.location.reload(true);

			} else {
				//alert("Burning error");
				setMsg_loading(0);
				setErrorMsg_remove(1);
				setSuccessMsg_remove(0);
			}

			if (response.data == "networkError") {
				setErrorMsg_remove(1);

				setSuccessMsg_remove(0);
				setMsg_loading(0);
			}

		} catch (err) {
			console.log(err);
		}

	}

	async function handleConnectPoly_Drn() {
		setWeaponDiv(false);
		setPopDivOpen(true);
		if (chain?.id !== 8453) {
			switchNetwork?.(8453);
		}

		if (!walletAddress) {
			alert("Please connect your wallet.");
			return;
		}

		try {
			//const message = `Sign this message to verify your wallet: ${walletAddress}`;
			//const signature = await signMessageAsync({ message });	

			setMsg_loading(1);
			setStatusLoadTilImg(1);

			await fetch1155NFTs(2);

			console.log("polygon");


		} catch (error) {
			console.error("Error signing message:", error);
		}


	}

	async function handleConnectPoly_SP() {
		setWeaponDiv(false);
		setPopDivOpen(true);

		if (chain?.id !== 8453) {
			switchNetwork?.(8453);
		}

		if (!walletAddress) {
			alert("Please connect your wallet.");
			return;
		}

		try {
			//const message = `Sign this message to verify your wallet: ${walletAddress}`;
			//const signature = await signMessageAsync({ message });	
			setMsg_loading(1);
			setStatusLoadTilImg(1);

			await fetch1155NFTs(0);

			console.log("polygon");

			// Send to backend
			/*	const response = await axios.post("https://roboticrabbitsyndicate.io/api/burn_SP", {
					message: message,
					signature: signature,
					selectedTokenId_server: Number(_selectedTokenId),
					burningSpecial_server: _mintingWeapon,
					selectededNetwork: 8453
	
				}, {
					headers: {
						'Content-Type': 'application/json',
					},
	
				});
	
	
				if (response.data.success) {
					setConnected(true);
					alert("Signature verified!");
				} else {
					alert("Signature verification failed!");
				}*/

			//console.log(response.data);


		} catch (error) {
			console.error("Error signing message:", error);
		}


	}

	async function handleConnectPoly_WP() {
		setWeaponDiv(false);
		setPopDivOpen(true);

		if (chain?.id !== 8453) {
			switchNetwork?.(8453);
		}
		if (!walletAddress) {
			alert("Please connect your wallet.");
			return;
		}

		try {
			//const message = `Sign this message to verify your wallet: ${walletAddress}`;
			//const signature = await signMessageAsync({ message });

			setMsg_loading(1);
			setStatusLoadTilImg(1);

			await fetch1155NFTs(1);


			console.log("polygon");

			// Send to backend
			/*	const response = await axios.post("https://roboticrabbitsyndicate.io/api/burn_SP", {
					message: message,
					signature: signature,
					selectedTokenId_server: Number(_selectedTokenId),
					burningSpecial_server: _mintingWeapon,
					selectededNetwork: 8453
	
				}, {
					headers: {
						'Content-Type': 'application/json',
					},
	
				});
	
	
				if (response.data.success) {
					setConnected(true);
					alert("Signature verified!");
				} else {
					alert("Signature verification failed!");
				}*/


		} catch (error) {
			console.error("Error signing message:", error);
		}


	}

	async function choosePower_SP(tkId) {
		if (chain?.id !== 8453) {
			switchNetwork?.(8453);
		}

		if (!walletAddress) {
			alert("Please connect your wallet.");
			return;
		}

		try {

			setMsg_loading(1);

			//const message = `Sign this message to verify your wallet: ${walletAddress}`;
			//const signature = await signMessageAsync({ message });

			console.log("polygon");
			// Send to backend
			const response = await axios.post("https://roboticrabbitsyndicate.io/api/burn_SP", {
				//message: message,
				//signature: signature,
				selectedTokenId_server: Number(_selectedTokenId),
				burningSpecial_server: Number(tkId),
				selectedNetwork: '8453',
				userAddress_server: walletAddress

			}, {
				headers: {
					'Content-Type': 'application/json',
				},

			});


			if (response.data == "SPOkay") {
				setConnected(true);
				//alert("Burning successful!");
				setSuccessMsg(1);
				setErrorMsg(0);
				setMsg_loading(0);
			} else {
				//alert("Burning error");
				setErrorMsg(1);
				setSuccessMsg(0);
				setMsg_loading(0);
			}

			if (response.data == "networkError") {
				setErrorMsg_remove(1);
				setSuccessMsg_remove(0);
				setMsg_loading(0);
			}

		} catch (error) {
			console.error("Error signing message:", error);
		}


	}

	async function choosePower_Drn(tkId) {
		if (chain?.id !== 8453) {
			switchNetwork?.(8453);
		}

		if (!walletAddress) {
			alert("Please connect your wallet.");
			return;
		}

		try {

			setMsg_loading(1);

			//const message = `Sign this message to verify your wallet: ${walletAddress}`;
			//const signature = await signMessageAsync({ message });

			console.log("polygon");

			console.log("_drn_selectedTokenId_server :" + Number(_selectedTokenId));
			console.log("_drn_mintingSpecial_server :" + Number(tkId));
			console.log("_drn_selectedNetwork :" + '8453');
			console.log("_drn_userAddress_server :" + walletAddress);
			console.log("_drn_RECEIVED_DRONE_VALUE :" + Number(tkId));

			// Send to backend
			const response = await axios.post("https://roboticrabbitsyndicate.io/api/addDrone", {
				//message: message,
				//signature: signature,
				selectedTokenId_server: Number(_selectedTokenId),
				mintingSpecial_server: Number(tkId),
				selectedNetwork: '8453',
				userAddress_server: walletAddress,
				RECEIVED_DRONE_VALUE: Number(tkId)
			}, {
				headers: {
					'Content-Type': 'application/json',
				},

			});


			if (response.data == "CS_SPOkay") {
				setConnected(true);
				//alert("Burning successful!");
				setSuccessMsg(1);
				setErrorMsg(0);
				setMsg_loading(0);
			} else {
				//alert("Burning error");
				setErrorMsg(1);
				setSuccessMsg(0);
				setMsg_loading(0);
			}

			if (response.data == "networkError") {
				setErrorMsg_remove(1);
				setErrorMsg(0);
				setSuccessMsg_remove(0);
				setMsg_loading(0);
			}

		} catch (error) {
			console.error("Error signing message:", error);
		}


	}

	async function choosePower_WP(tkId) {
		if (chain?.id !== 8453) {
			switchNetwork?.(8453);
		}

		if (!walletAddress) {
			alert("Please connect your wallet.");
			return;
		}

		try {
			//const message = `Sign this message to verify your wallet: ${walletAddress}`;
			//const signature = await signMessageAsync({ message });

			setMsg_loading(1);

			console.log("polygon");
			// Send to backend
			const response = await axios.post("https://roboticrabbitsyndicate.io/api/burn_WP", {
				//message: message,
				//signature: signature,
				selectedTokenId_server: Number(_selectedTokenId),
				burningWeapon_server: Number(tkId),
				selectedNetwork: '8453',
				userAddress_server: walletAddress

			}, {
				headers: {
					'Content-Type': 'application/json',
				},

			});


			if (response.data == "WPOkay") {
				setConnected(true);
				//alert("Burning successful!");
				setSuccessMsg(1);
				setErrorMsg(0);
				setMsg_loading(0);

			} else {
				//alert("Burning error");
				setErrorMsg(1);
				setSuccessMsg(0);
				setMsg_loading(0);
			}

			if (response.data == "networkError") {
				setErrorMsg_remove(1);
				setSuccessMsg_remove(0);
				setMsg_loading(0);
			}

		} catch (error) {
			console.error("Error signing message:", error);
		}


	}

	async function fetch1155NFTs(choiceIndex) {
		try {
			const contract_1155 = new web3_1155.eth.Contract(ABIArmoury, addressArmoury);
			const maxIds = await contract_1155.methods.max_ids().call();
			console.log("maxIds : " + maxIds);
			let tokenIdArray_1155 = [];
			const specialPowers = armoryList["Special Power"];
			const droneList = armoryList["Drone"];
			console.log("inside fetch functions specialPowers : " + specialPowers);
			console.log("inside fetch functions droneList : " + droneList);

			setLoadingImgs2(1);

			for (let x = 0; x <= Number(maxIds); x++) {
				const balance1155 = await contract_1155.methods.balanceOf(walletAddress, x).call();

				if (parseInt(balance1155) > 0) {
					if (choiceIndex === 3) {
						tokenIdArray_1155.push({ tokenId: x, balance: balance1155 });
					} else {
						if (choiceIndex === 0 && specialPowers.includes(x)) {
							// Push only special weapons
							tokenIdArray_1155.push({ tokenId: x, balance: balance1155 });
						}
						else if (choiceIndex === 1 && !specialPowers.includes(x) && !droneList.includes(x)) {
							// Push only normal weapons (excluding special ones)
							tokenIdArray_1155.push({ tokenId: x, balance: balance1155 });
						}
						else if (choiceIndex === 2 && droneList.includes(x)) {
							// Push only drones (excluding special ones)
							tokenIdArray_1155.push({ tokenId: x, balance: balance1155 });
						}

					}

					console.log(`Token ID_1155 fetched: ${x} - Balance: ${balance1155}`);
				}
			}

			setLoadingImgs2(0);
			// Update the state with filtered results
			setTokenArray_1155(tokenIdArray_1155);
			setChoiceIndex(choiceIndex);
			console.log("Filtered tokenIdArray_1155:", tokenIdArray_1155);

			setMsg_loading(0);
			setStatusLoadTilImg(0);

			//await new Promise(resolve => setTimeout(resolve, 2000));

		} catch (error) {
			console.error("Error fetching 1155 tokens:", error);
			setMsg_loading(0);
			setStatusLoadTilImg(0);
			throw error;
		}
	}


	async function handleConnect() {
		if (chain.id !== 943) {
			switchNetwork(943)
		}

		/*if (localStorage.getItem('plsBtnClicked') !== 'plsBtn' && localStorage.getItem('plsConnected') !== 'pls') {
			if (chain.id !== 943) {
				switchNetwork(943);
			}
	
			console.log("I'm in if");
		} else {
			console.log("I'm in else");
		}*/

		//var data = await getBalance();
		//setmyNFTWallet(Number(data.data));
		//console.log("myNFTWallet :" + data.data);
		setConnected(true);

		/*if (sessionStorage.getItem('plsConnected') !== 'pls') {
			sessionStorage.setItem('tokenId', tokenId);
		}*/
	}

	useEffect(() => {

		const contract_721 = new web3_mm.eth.Contract(ABI, address);

		if (statusError) {
			const timer = setTimeout(() => {
				setstatusError(false);  // Assuming you have a setter to change the state
			}, 4000); // 4 minutes in milliseconds

			// Cleanup the timeout when the component unmounts or the statusError changes
			return () => clearTimeout(timer);
		}

		if (showErrorDiv) {
			const timer = setTimeout(() => {
				setshowErrorDiv(false);  // Assuming you have a setter to change the state
			}, 4000); // 4 minutes in milliseconds

			// Cleanup the timeout when the component unmounts or the statusError changes
			return () => clearTimeout(timer);
		}

		async function fetchData2() {
			try {

				setLoadingImgs(1);
				setLoadingImgsBtn(1);

				const data1 = await contract_721.methods.balanceOf(walletAddress).call()
				setmyNFTWallet(Number(data1));
				console.log("myNFTWallet :", data1);

				let tokenIdArray = [];

				for (let x = 0; x < Number(data1); x++) {
					try {
						// Call the tokenOfOwnerByIndex function
						const tokenId = await contract_721.methods.tokenOfOwnerByIndex(walletAddress, x).call();
						tokenIdArray.push(tokenId);
						console.log("Token ID fetched:", tokenId);
					} catch (error) {
						console.error('Error fetching token:', error);
						throw error;
					}
				}

				setTimeout(() => {
					setLoadingImgs(0); // Ensure state updates properly after a short delay
					setLoadingImgsBtn(0); // Ensure state updates properly after a short delay

				}, 500);
				// Update the state with the complete array after the loop finishes
				setTokenArray(tokenIdArray);
				console.log("Final tokenIdArray:", tokenIdArray);
			} catch (error) {
				console.error("Error in fetchData2:", error);
			}
		}

		if (_connected) {
			if (chain.id == 943) {
				setLoadingImgs(1);
				setLoadingImgsBtn(1);
			}

			fetchData2();
			fetchBalance();

			//fetch1155NFTs(3);
		}

		// eslint-disable-next-line no-use-before-define
	}, [showErrorDiv, statusError, _connected, _responseUpdated /*getBalance, getCost, getTotalSupply, nftMintingAmount*/]);

	const { writeAsync } = useContractWrite({
		...contract,
		onError(error) {
			if (error.message.includes('balance')) {
				setstatusError(true)
				setstatusLoading(false)
			}
		}
	})

	async function onMint() {
		try {

			setstatusLoading(true)
			setstatusError(false)

			var res = await writeAsync({
				functionName: 'mint',
				value: '1000000000000000',
				gas: 2100000,
				gasPrice: 210000000000
			})

			var result = await publicClient.waitForTransactionReceipt(res)
			if (result.status === 'success') {
				setstatusError(false)
				setsuccess(true)
				setstatusLoading(false)
				setshowErrorDiv(false);
				await new Promise(resolve => setTimeout(resolve, 5000));
				window.location.reload(true);

			} else if (result.status) {
				setsuccess(false)
				setstatusError(true)
				setstatusLoading(false)
				setshowErrorDiv(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setsuccess(true);

				await new Promise(resolve => setTimeout(resolve, 5000));
				window.location.reload(true);
			}
			if (e.message.includes("err: insufficient funds for gas")) {
				//setErrorMsg1("Insufficient funds");
				setshowErrorDiv(true); // Show the error div for insufficient funds
				setstatusError(false);
				setstatusLoading(false);

			} else if (e.message.includes("User rejected the request")) {
				//setErrorMsg1("User Rejected");
				setshowErrorDiv(false);
				setstatusError(false);
				setstatusLoading(false);
			} else {
				//setErrorMsg1("Sorry, something went wrong");
				setshowErrorDiv(false);
				setstatusError(true);
				setstatusLoading(false);
			}

		}
	}

	function shortenAddress(walletAddress) {
		try {
			return _connected
				? walletAddress.slice(0, 3) + "..." + walletAddress.slice(-4)
				: "Connect";
		} catch (error) {
			console.log(error);
		}
	}

	async function disconnectWallet() {
		setConnected(false);
		disconnect();
		//window.location.reload(true);

		localStorage.removeItem('scannerPassed');
		setShowDetails(false); // Reset the details view
	}

	const handleClick = (id) => {
		setWeaponDivOpen(id); // Existing function
		setSelectedToken(selectedToken === id ? null : id); // Toggle selection
		setShowImg(id)
	};

	const getUpgradedTraits = async () => {
		try {
			//const upgradedTraits = await contract.methods.getUpgradedTraits().call();
			const contract_1155 = new web3_1155.eth.Contract(ABIArmoury, addressArmoury);

			const upgradedTraits = await contract_1155.methods.getUpgradedTraits().call();

			console.log("Upgraded Traits:", upgradedTraits);
			return upgradedTraits.map(id => Number(id)); // Convert BigNumber to Number
		} catch (error) {
			console.error("Error fetching upgraded traits:", error);
			return [];
		}
	};

	// Check if mobile on component mount
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const fetchBalance = async () => {
		try {
			const contract_1155 = new web3_1155.eth.Contract(ABIArmoury, addressArmoury);
			const carroTechNFTAmount = await contract_1155.methods.balanceOf(walletAddress, 0).call();
			console.log("walletAddress : " + walletAddress);
			console.log("carroTechNFTAmount:", carroTechNFTAmount);
			setCheckBalance(carroTechNFTAmount > 0);
		} catch (error) {
			console.error("Error fetching carroTechNFTAmount:", error);
			setCheckBalance(false);
		}
	};

	const handleImageClick = async () => {
		if (!_connected) return; // Don't proceed if wallet isn't connected

		if (currentImage === 'scanner_1') {
			setCurrentImage('scanner_2');
			setTimeout(async () => {
				await fetchBalance();
				if (checkBalance) {
					setCurrentImage('scanner_success');
					localStorage.setItem('scannerPassed', 'true');
				} else {
					setCurrentImage('scanner_error');
				}
			}, 5000);
		}

		// If already on scanner_error and user clicks again
		if (currentImage === 'scanner_error') {
			window.location.href = 'https://carrotech.vercel.app/';
		}
	};


	// Check if user has passed scanner and stored it in localStorage
	useEffect(() => {
		const scannerPassed = localStorage.getItem('scannerPassed');
		if (scannerPassed === 'true') {
			setShowDetails(true);
		}
	}, []);

	// Effect to handle fade-out when scanner_success appears
	useEffect(() => {
		if (currentImage === 'scanner_success') {
			setTimeout(() => {
				setFadeOut(true); // Trigger fade-out
				setTimeout(() => {
					setShowDetails(true); // Show other details after fade-out
				}, 3500); // Wait for fade-out to complete
			}, 3500); // Wait for 3 seconds before starting fade-out
		}
	}, [currentImage]);

	const getImageSrc = () => {
		switch (currentImage) {
			case 'scanner_1':
				return isMobile ? scanner_1_mob : scanner_1;
			case 'scanner_2':
				return isMobile ? scanner_2_mob : scanner_2;
			case 'scanner_success':
				return isMobile ? scanner_success_mob : scanner_success;
			case 'scanner_error':
				return isMobile ? scanner_error_mob : scanner_error;
			default:
				return isMobile ? scanner_1_mob : scanner_1;
		}
	};


	const fetchMetadata = async (tkId) => {
		console.log("Fetching Metadata for Token ID:", tkId);
		setLoadingImg(true); // Start loading

		try {
			// Fetch NFT metadata
			const response = await fetch(`https://robotic-rabbit-metadata-live-replica05.s3.us-east-2.amazonaws.com/${tkId}.json?t=${Date.now()}`,
				{ cache: "no-store" }
			);
			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

			const data = await response.json();

			if (data.attributes && Array.isArray(data.attributes)) {
				// Map NFT traits to their IDs
				const matchedTraits = data.attributes.map(attr => {
					const match = traitIdList.find(trait => trait.type === attr.trait_type && attr.value.includes(trait.name));
					return match ? match.id : null;
				}).filter(id => id !== null);

				console.log("Matched Traits:", matchedTraits);


				const upgradedStatuses = await Promise.all(
					matchedTraits.map(async (traitId) => {
						try {
							const contract_1155 = new web3_1155.eth.Contract(ABIArmoury, addressArmoury);
							const isUpgraded = await contract_1155.methods.isTraitUpgradedOfTheNftId(tkId, traitId).call();
							console.log("isUpgraded : " + isUpgraded);
							await new Promise(resolve => setTimeout(resolve, 500));

							return isUpgraded ? traitId : null;
						} catch (error) {
							console.error(`Error checking trait ${traitId}:`, error);
							return null;
						}
					})
				);

				const userUpgradedMatches = upgradedStatuses.filter(id => id !== null);

				const upgradedTraitsArray = userUpgradedMatches; // Store upgraded trait IDs in an array
				console.log("Array of Upgraded Trait IDs:", upgradedTraitsArray);


				// Fetch upgraded traits from blockchain
				const upgradedTraits = await getUpgradedTraits();

				console.log("1-- :" + upgradedTraits);

				const upgradedTraitsNumbers = upgradedTraits.map(id => Number(id));

				console.log("2-- :" + upgradedTraitsNumbers);


				// Find upgraded traits in this NFT
				const upgradedMatches = matchedTraits.filter(id => upgradedTraitsNumbers.includes(id));
				console.log("3-- :" + upgradedMatches);


				console.log("Upgraded Traits in this NFT:", upgradedMatches);

				// Map upgraded trait IDs to their Type & Name
				const upgradedTraitDetails = upgradedMatches.map(id => {
					const trait = traitIdList.find(trait => trait.id === id);
					return trait ? { type: trait.type, name: trait.name } : null;
				}).filter(trait => trait !== null);

				console.log("upgradedTraitDetails : " + JSON.stringify(upgradedTraitDetails));
				setUpgradedTraitDetails(upgradedTraitDetails);


				// Map upgraded trait IDs to their Type & Name
				const upgradedTraitDetails2 = userUpgradedMatches.map(id => {
					const trait = traitIdList.find(trait => trait.id === id);
					return trait ? { type: trait.type, name: trait.name } : null;
				}).filter(trait => trait !== null);

				console.log("upgradedTraitDetails2 : " + JSON.stringify(upgradedTraitDetails2));
				setUpgradedTraitDetails2(upgradedTraitDetails2);


				fetch("https://roboticrabbitsyndicate.io/api/createUpgradeImg", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ _upgradedTraitDetails: upgradedTraitDetails, _upgradedTraitDetails2: upgradedTraitDetails2 })
				})
					.then(response => response.json())
					.then(data => {
						if (data.image) {
							document.getElementById("generatedImage").src = data.image;
						} else {
							console.error("Failed to receive image");
						}
					})
					.catch(error => console.error("Error:", error));

				console.log("Upgraded Trait Details:", upgradedTraitDetails);

				//return upgradedImageUrls; // Return all matching image URLs
			} else {
				console.error("Invalid attributes format");
			}

			setLoadingImg(false);
			//await new Promise(resolve => setTimeout(resolve, 2000));
			setShowPopup(true);

		} catch (err) {
			console.error("Error fetching metadata:", err.message);
		}
	};

	const sendUpgradeDetails = async (traitType, selectedUpgradedTrait, tokenId) => {

		setConnected(true);

		setMsg_loading(1);

		const payload = {
			_traitType: traitType,
			_selectedUpgradedTrait: selectedUpgradedTrait,
			_tokenId: Number(tokenId),
			_userAddress: walletAddress
		};

		try {
			const response = await fetch('https://roboticrabbitsyndicate.io/api/upgradeExistingTrait', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error('Failed to upgrade trait');
			}

			const data = await response.json();
			console.log('Final image path:', data.finalImagePath);
			if (response.data = "CS_SPOkay") {
				setMsg_loading(0);
				setSuccessMsg_remove(1);
				setStatus("Process Completed!");

				//await new Promise(resolve => setTimeout(resolve, 4000));
				//window.location.reload(true);
				setErrorMsg_remove(0);
				console.log("notification_sp: " + response.data);
				setResponseUpdated(1);

			} else {
				//alert("Burning error");
				setMsg_loading(0);
				setErrorMsg_remove(1);
				setSuccessMsg_remove(0);
				console.log("notification_sp: " + response.data);
				setResponseUpdated(1);
			}
			// You can add further UI handling here
		} catch (error) {
			console.error('Error upgrading trait:', error);
			setMsg_loading(0);
			setErrorMsg_remove(1);
			setSuccessMsg_remove(0);
		}
	};

	const connectWalletScanner = async () => {
		handleImageClick();
	}

	return (
		<div>
			{showDetails ? (
				<>

					<div className='wrapperMain'>
						<div className="Wrpperr">
							<div class="center-wrapper">
								<div class="nft-banner">
									<span class="glow">🚀 You own a <strong>Carrotech NFT</strong>!</span>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className={`scanner-container ${fadeOut ? 'fade-out' : ''}`}>
					<div className="scanners">
						<img
							src={getImageSrc()}
							alt="Scanner sequence"
							onClick={handleImageClick}
							style={{ cursor: 'pointer' }}
						/>
					</div>

					{currentImage === 'scanner_1' && (
						<>
							{_connected ? (
								<>
									{/*<button className='checkAccess2' onClick={() => disconnectWallet()}
										style={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											zIndex: 10,
										}}>
										{walletAddress === "" ? "Connect Wallet" : shortenAddress(walletAddress)}
										<br />
									</button>*/}

									<button class="connectNew" onClick={connectWalletScanner}
										style={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											zIndex: 10,
										}}>
										Check Access
									</button>
								</>
							) : (
								<button class="connectNew" onClick={() => { open(); }}
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										zIndex: 10,
									}}
								>Connect</button>
							)}
						</>
					)}

				</div>


			)}



		</div>
	)

}
export default Carrotech;