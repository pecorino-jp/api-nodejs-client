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
    const { totalCount, data } = await accountService.searchWithTotalCount({
        accountType: 'Point',
        // name: 'TARO',
        // accountNumbers: ['61201118800'],
        // statuses: [client.factory.accountStatusType.Opened],
        limit: 10,
        page: 1,
        sort: {
            // accountNumber: 1
            openDate: -1
            // balance: 1
        }
    });
    console.log(totalCount, 'accounts found.');
    console.log(data.length, 'accounts returned.');
}

main().then(() => {
    console.log('main processed.');
}).catch(console.error);
