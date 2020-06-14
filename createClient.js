'use strict'

const fs = require('fs')
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const networkPath = path.resolve(__dirname, '../network');
const wallet = new FileSystemWallet('./wallet');

module.exports = async () => {
    try {
        const credPath = path.join(networkPath, '/crypto-config/peerOrganizations/farminspector.supplychain.com/users/Admin@farminspector.supplychain.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/Admin@farminspector.supplychain.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/64338428c0d34df2752cd665a76c82f7653ea9775562bc0ec3b96f38d4f79165_sk')).toString();

        const identityLabel = 'Admin@farminspector.supplychain.com'
        const identity = X509WalletMixin.createIdentity('FarmInspectorMSP', cert, key)
        if (!(await wallet.exists(identityLabel))) {
            await wallet.import(identityLabel, identity);
            console.log("Identity created and imported to wallet")
        } else {
            console.log("Identity creation skipped as the identity already exists in the wallet")
        }

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}