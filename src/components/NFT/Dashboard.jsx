import { useMoralis } from 'react-moralis';
import { Moralis } from 'moralis';
import React from "react";
import { Navigate } from "react-router-dom";
import { useMoralisWeb3Api } from "react-moralis";

function Dashboard(){
    const Web3Api = useMoralisWeb3Api();
    const { isAuthenticated, user, logout } = useMoralis();

    if(isAuthenticated){

        const currentUser = Moralis.User.current();

        async function getNFTs() {
        // get NFTs for current user on Mainnet
        // const userEthNFTs = await Web3Api.account.getNFTs();
        // console.log(userEthNFTs);
        // get testnet NFTs for user
        
        const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
            chain: "rinkeby",
        });
        console.log(testnetNFTs);

        // const transfersNFT = await Web3Api.account.getNFTTransfers();
        // console.log(transfersNFT);

        }

        async function getAllTokenIds() {
            const options = {
              address: "0x7dE3085b3190B3a787822Ee16F23be010f5F8686",
              chain: "eth",
            };
            const NFTs = await Web3Api.token.getAllTokenIds(options);
            console.log(NFTs);
        }
        async function getTokenBalances(){
                const balances = await Web3Api.account.getTokenBalances({
                    chain: "rinkeby",
                });
                console.log(currentUser.account)
                console.log(balances);
        }
        async function getNFTsWithCovalent(){
            Moralis.initPlugins();
            // console.log(Moralis.Plugins);
            const covalent = Moralis.Plugins.covalent;
            const result = await covalent.getTransactionsForAddress({
                chainId: 1,
                address: '0xAF30728A1bAb4fAdfA0d22991892cE62a90ab22A',
              });
            // const result = await covalent.getChains();
            console.log(result);
        }
        getNFTsWithCovalent();
        // getNFTs();
        // getAllTokenIds();
        // getTokenBalances();
        return(
            <>
                <div className="col-6 mx-auto">
                    <h2>NFTs</h2>
                    
                </div>
            </>
        )
    } else {
        return (
            <Navigate to="/" replace={true} />
        )
    };
}
export default Dashboard;
