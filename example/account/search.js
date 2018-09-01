/**
 * 口座検索サンプル
 */
const client = require('../../lib/');

const auth = new client.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: []
});
const accountService = new client.service.Account({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const accounts = await accountService.search({
        accountType: 'Coin',
        // name: 'TARO',
        // accountNumbers: ['1532938324'],
        // statuses: [client.factory.accountStatusType.Opened],
        // limit: 1,
        // page: 1,
        sort: {
            accountNumber: 1
            // openDate: -1
            // balance: 1
        }
    });
    console.log('accounts:', accounts);
    console.log(accounts.length, 'accounts found.');
}

main().then(() => {
    console.log('main processed.');
}).catch(console.error);
