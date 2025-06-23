import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { base } from 'wagmi/chains';
import '../SignIn.css';
import jet from '../assets/mediumLogin.gif';
import logo from '../assets/logo.webp';

const CONTRACT_ADDRESS = "0x53fe2089164Eb0C718D50EA5840d19815B9fa915";
const CONTRACT_ABI = [
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

const SignUp = () => {
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const formatErrorMessage = (error) => {
    if (!error) return "";
    if (error.message?.includes("User rejected the request")) {
      return "Transaction was cancelled";
    }
    if (error.message?.includes("Request Arguments")) {
      return "Transaction failed. Please try again";
    }
    return error.message || "Something went wrong";
  };

  const contractConfig = {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
  };

  const { data: userData, refetch: refetchUser } = useContractRead({
    ...contractConfig,
    functionName: 'getUser',
    args: [address],
    enabled: false,
  });

  const { writeAsync: registerUser } = useContractWrite({
    ...contractConfig,
    functionName: 'register',
  });

  const [pendingTxHash, setPendingTxHash] = useState(null);
  const { data: txReceipt, isLoading: isWaitingForTx } = useWaitForTransaction({
    hash: pendingTxHash,
    enabled: !!pendingTxHash,
  });

  const handleConnect = async () => {
    try {
      await open();
      if (chain?.id !== base.id) {
        try {
          await switchNetwork?.(base.id);
        setError("");
        checkUserRegistration();
        return;
        } catch (switchError) {
          console.error("Failed to switch network:", switchError);
          setError("Please switch to Base network in your wallet");
        }
      }
      setError("");
    } catch (err) {
      console.error("Connection error:", err);
      setError(formatErrorMessage(err));
    }
  };

  useEffect(() => {
    if (isConnected && chain?.id !== base.id) {
      setError("Please switch to Base network");
    } else {
      setError("");
    }
  }, [isConnected, chain]);

  const checkUserRegistration = async () => {
    if (!address) return;
    
    try {
      const { data } = await refetchUser();
      
      if (data && data[2]) {
        setUsername(data[0]);
        setIsRegistered(true);
        setError("You are already registered. Please sign in instead.");
        setSuccess("");
      } else {
        setIsRegistered(false);
        setError("");
      }
    } catch (err) {
      console.error("Registration check error:", err);
      setError(formatErrorMessage(err));
      setIsRegistered(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      checkUserRegistration();
    } else {
      setUsername("");
      setIsRegistered(false);
      setSuccess("");
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (txReceipt && pendingTxHash) {
      setSuccess("Registration complete! Redirecting to dashboard...");
      setIsRegistered(true);
      setPendingTxHash(null);
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [txReceipt, pendingTxHash, navigate]);

  const handleDisconnect = () => {
    disconnect();
    setUsername("");
    setIsRegistered(false);
    setSuccess("Wallet disconnected");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (chain?.id !== base.id) {
      setError("Please switch to Base network");
      return;
    }

    if (!username) {
      setError("Please enter a username");
      return;
    }

    if (isRegistered) {
      setError("You are already registered. Please sign in instead.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      const tx = await registerUser({
        args: [username],
      });
      
      setSuccess("Registration transaction sent! Waiting for confirmation...");
      setPendingTxHash(tx.hash);
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(formatErrorMessage(err));
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isWaitingForTx) {
      setIsSubmitting(true);
    } else if (!pendingTxHash) {
      setIsSubmitting(false);
    }
  }, [isWaitingForTx, pendingTxHash]);

  const shortenAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
  };

  return (
    <div className="signin-container">
      <div className="signin-grid">
        {/* Image section */}
        <div className="signin-image-area">
          <div className="signin-image-content">
            <img src={jet} alt="Welcome" className="signin-image" />
            <div className="signin-image-gradient-top"></div>
            <div className="signin-image-gradient-left"></div>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="signin-back-button"
          >
            {/* Back icon can be added here */}
          </button>
        </div>

        {/* Form section */}
        <div className="signin-form-area">
          <form onSubmit={handleSubmit} className="signin-form">
			<img className='logo' src={logo}/>
            <h2 className="signin-form-title">Sign Up</h2>
            
            <p className="signin-form-text">
              Create an account with your wallet.
            </p>

            {error && (
              <div className="signin-error">
                {error}
              </div>
            )}
            {success && (
              <div className="signin-success">
                {success}
              </div>
            )}

            <ul className="signin-features">
              <li className="signin-feature-item">
                <span className="signin-feature-icon">✔</span>
                <span>Secure registration</span>
              </li>
              <li className="signin-feature-item">
                <span className="signin-feature-icon">✔</span>
                <span>Your data stays private</span>
              </li>
            </ul>

            <div className="signin-divider">
              {/*<hr className="signin-divider-line" />
              <div className="signin-divider-stars"></div>
              <hr className="signin-divider-line" />*/}
            </div>

            {isConnected && (
              <div className="signin-input-group">
                <label htmlFor="username" className="signin-input-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="signin-input"
                  disabled={isRegistered || isSubmitting}
                  placeholder="Enter your username"
                  maxLength={32}
                />
              </div>
            )}

            <div className="signin-buttons">
              {!isConnected ? (
                <button
                  type="button"
                  onClick={handleConnect}
                  className="signin-connect-button"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="signin-wallet-info">
                  <p className="signin-wallet-address">
                    {shortenAddress(address)}
                    {chain?.id !== base.id && (
                      <span className="signin-network-warning">
                        Wrong network! Please switch to Base
                      </span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    id="disconnect"
                  >
                    Disconnect
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={!isConnected || isRegistered || isSubmitting || !username || chain?.id !== base.id}
                className={`signin-submit-button ${(!isConnected || isRegistered || isSubmitting || !username || chain?.id !== base.id) ? 'signin-submit-disabled' : ''}`}
              >
                {isSubmitting ? (
                  isWaitingForTx ? "Confirming..." : "Registering..."
                ) : "Sign Up"}
              </button>
            </div>

            <div className="signin-signup-link">
              <span>Already have an account?</span>&nbsp;
              <Link to="/sign-in" className="signin-signup-text">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;