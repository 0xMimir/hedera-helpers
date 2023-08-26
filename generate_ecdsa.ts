import { AccountCreateTransaction, Client, PrivateKey } from "@hashgraph/sdk";
require('dotenv').config();

const privateKey = PrivateKey.fromString(process.env.DER_ENCODED_PRIVATE_KEY)
const client = ((process.env.NETWORK === "mainnet") ? Client.forMainnet() : Client.forTestnet());
client.setOperator(process.env.ACCOUNT_ID, privateKey);

async function generateEsdsaAccount(client: Client){
    const newKey = PrivateKey.generateECDSA();
    console.log(`Private DER key: ${newKey}`);
    
    let accountTx = await new AccountCreateTransaction()
        .setKey(newKey)
        .execute(client);

    let receipt = await accountTx.getReceipt(client);
    let accountId = receipt.accountId;

    console.log(`Account id: ${accountId}`);
    console.log(`Public key: ${newKey.publicKey}`)
    console.log(`EVM address: 0x${newKey.publicKey.toEvmAddress()}`)
    process.exit()
}


generateEsdsaAccount(client);