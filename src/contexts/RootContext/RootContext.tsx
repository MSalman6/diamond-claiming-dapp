import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { ContextProviderProps } from "./types";
import { Log } from '@ethersproject/abstract-provider';
import { CryptoSol } from 'diamond-contracts-claiming/dist/api/src/cryptoSol';
import React, { createContext, useContext, useEffect, useState } from "react";
import ClaimContract from 'diamond-contracts-claiming/artifacts/contracts/ClaimContract.sol/ClaimContract.json';
import { useWalletConnectContext } from '../WalletConnect';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { switchChain, watchAccount } from '@wagmi/core';
import { wagmiConfig } from "../WalletConnect/config";
import { useAccount, useDisconnect } from 'wagmi';


interface RootContextProps {
  appKit?: any,
  provider: any,
  claimApi: any,
  account: string | null,
  rootInitialized: boolean,

  ensureWalletConnection: () => boolean,
  handleErrorMsg: (err: Error, alternateMsg: string) => void,
  showLoader: (loading: boolean, loadingMsg: string) => void,
  getClaimTxHash: (v3Address: string) => Promise<string | null>,
}

const RootContext = createContext<RootContextProps | undefined>(undefined);

const RootContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const { disconnect } = useDisconnect();
  const { appKit } = useWalletConnectContext();
  const { connector, isConnected, status } = useAccount();

  const [claimApi, setClaimApi] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [claimContract, setClaimContract] = useState<any>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [rootInitialized, setRootInitialized] = useState<boolean>(false);
  const [provider, setProvider] = useState<any>(new ethers.JsonRpcProvider(import.meta.env.VITE_APP_RPC_URL));

  // Initialize Web3 with CustomHttpProvider
  const chainId = import.meta.env.VITE_APP_CHAIN_ID || 777019;
  const rpcUrl = import.meta.env.VITE_APP_RPC_URL || 'http://62.171.133.46:55100/';
  const [wagmiConnector, setWagmiConnector] = useState<WalletConnectProvider | null>(null);

  useEffect(() => {
    if (connector?.getProvider && isConnected && status === 'connected') {
      InitializeWagmiWallet(connector);
    }
  }, [connector, isConnected, status]);

  useEffect(() => {
    if (wagmiConnector) {
      const unwatch = watchAccount(wagmiConfig, {
        onChange(account) { 
          if (account.address) {
            InitializeWagmiWallet(wagmiConnector);
          } else {
            window.location.reload();
          }
        },
      })
    
      return () => {
        unwatch()
      };
    }
  }, [wagmiConnector]);

  useEffect(() => {
    console.log("[INFO] Initializing Root Context");
    initialize();
  }, [account]);

  const showLoader = (loading: boolean, loadingMsg: string) => {
    setIsLoading(loading);
    setLoadingMessage(loadingMsg);
  }

  const initialize = async () => {
    if (!rootInitialized) {
      setRootInitialized(true);
    }

    getClaimContract().then((contract: any) => {
      setClaimContract(contract);
      setClaimApi(new CryptoSol(contract));
    });
  }

  const handleErrorMsg = (err: Error, alternateMsg: string) => {
    if (err.message && !err.message.includes("EVM") && (err.message.includes("MetaMask") || err.message.includes("rejected"))) {
      toast.error("Transaction rejected by user.");
    } else {
      toast.error(alternateMsg);
    }
  }

  const InitializeWagmiWallet = async (connector: any) => {
    try {
      let provider = await connector.getProvider();
      provider = await new ethers.BrowserProvider(provider);
      const signer = await provider.getSigner();

      // Check if the user is on the correct network, if not switch to the desired network
      if (await signer.provider._network.chainId !== Number(chainId)) {
        try {
          showLoader(true, "Please connect to the DMD Network");
          await switchChain(wagmiConfig, { chainId: Number(chainId) });
          showLoader(false, "");
        } catch (err: any) {
          if (err.code === 4001) {
            showLoader(false, "");
            await connector.disconnect();
            disconnect();
            return toast.warn("Please connect to the DMD Network to continue");
          } else {
            console.error("[Wallet Connect] Error", err);
            showLoader(false, "");
            return undefined;
          }
        }
      }

      appKit.close(); // close modal after login

      // Retrieve the wallet address
      setProvider(provider);
      setAccount(signer.address);
      setWagmiConnector(connector);
        
      return provider
    } catch (err) {
      console.error(err);
    }
  }

  const getClaimContract = async () => {
    let signer;
    const contractAddress = import.meta.env.VITE_APP_CLAIMING_CONTRACT || '0xCAFa71b474541D1676093866088ccA4AB9a07722';

    try {
      signer = await provider.getSigner(0);
    } catch (e) {}
    
    return new ethers.Contract(
      contractAddress, 
      ClaimContract.abi,
      signer ? signer : provider
    );
  }

  const ensureWalletConnection = (): boolean => {
    if (!account) {
      toast.warn("Please connect your wallet to proceed.");
      return false;
    }
    return true;
  }

  const getClaimTxHash = async (v4Address: string): Promise<string | null> => {
    try {
        let eventFilter = claimContract.filters.Claim(v4Address);
        let logs: Log[] = await claimContract.queryFilter(eventFilter, Number(import.meta.env.VITE_APP_CONTRACT_DEPLOY_BLOCK || 0));

        if (logs.length === 0) {
          return null;
        } else {
          const iface = new ethers.Interface(ClaimContract.abi);
          const latestLogs = logs
          .map((log) => {
            const parsedLog = iface.parseLog(log) as any;
            return {args: parsedLog.args, transactionHash: log.transactionHash};

          })
          .filter((parsedLog) => parsedLog?.args[0] === v4Address) as any;
          return latestLogs.length > 0 ? latestLogs[latestLogs.length - 1].transactionHash : null;
        }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const contextValue = {
    appKit,
    account,
    provider,
    claimApi,
    rootInitialized,
    
    ensureWalletConnection,
    handleErrorMsg,
    getClaimTxHash,
    showLoader
  };

  return (
    <RootContext.Provider value={contextValue}>
      <Loader isLoading={isLoading} loadingMessage={loadingMessage}/>
      {children}
    </RootContext.Provider>
  );
};

const useRootContext = (): RootContextProps => {
  const context = useContext(RootContext);

  if (context === undefined) {
    throw new Error("Coudln't fetch Root Context");
  }

  return context;
};

export { RootContextProvider, useRootContext };