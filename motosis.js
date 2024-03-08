const axios = require('axios');
const {mnemonicToAccount} = require("viem/accounts")
const {createWalletClient, http}=require("viem")
const {mainnet} = require("viem/chains")
// import { mnemonicToAccount } from 'viem/accounts'
// import { createWalletClient, http } from 'viem'
// import { mnemonicToAccount } from 'viem/accounts'
// import { mainnet } from 'viem/chains'

const config = {
    headers: {
        'authority': 'api.expedition.mitosis.org',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'content-type': 'application/json',
        'origin': 'https://expedition.mitosis.org',
        'referer': 'https://expedition.mitosis.org/',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
};

// Function to send registration request for each address
const registerAddress = async (address) => {
    try {
        const response = await axios.post('https://api.expedition.mitosis.org/v1/preregistration/register', { address }, config);
        console.log(`Registration successful for address: ${address}`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error registering address ${address}:`, error.response.data);
    }
};
const mnemonic = ""


// Loop through the addresses array and register each address
const registerAllAddresses = async () => {
    for (let index = 0; index < 1000; index++) {
        const account = mnemonicToAccount(mnemonic,{accountIndex:index})
        const client = createWalletClient({
            account,
            chain: mainnet,
            transport: http()
        })
        const addresses = await client.getAddresses()
        const address = addresses[0];
        console.log("address",address);
        await registerAddress(address);
    }
};

// Call the function to start registering all addresses
registerAllAddresses();
