# byndrDapp
Simple Dapp example to cover Blockchain, Ethereum &amp; Solidity essentials

1. This code works under only on the Kovan network
2. Git clone or download the entire folder and open a command prompt in the root directory of the folder (https://github.com/sknampally/byndrDapp)
3. Deploy the app using the command (node can be installed from https://nodejs.org/en/download/)
    `node byndrDapp.js`
4. You should get a response
    `Dapp started on port 3000`
5. Point you browser to the address localhost:3000 on a browser with the metamask extension installed. 
6. Metamask extension can be installed from https://metamask.io/ . After the intial sign up , close the deposit window to take you the menu where you can choose the network. 
7. Ensure that you are connected to the Kovan Test Network on Metamask and that your account has sufficient balance. On Kovan test network, the deposit function has an option for test faucet where you can obtain play ether for experimenting. 
8. If you want to deploy your own library, you can use the contract code given under Contracts/contracts.sol. The contract should be deployed to the Kovan network . Once the contract is deployed , please note the address at which this is deployed and update it in the contractAddress variable defined in the dashboard.js file

Remix ide can be accessed at http://remix.ethereum.org . The specific contract being used here can be accessed at the contractAddress declared in the dashboard.js file




Any queries -> please contact us at https://t.me/joinchat/Dzhg7BLntJBChRsCpCfFGw 

Solidity documentation is available at -> https://solidity.readthedocs.io/en/v0.4.24/metadata.html
web3 documentation is available at -> https://github.com/ethereum/web3.js/
