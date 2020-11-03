/**
 * 口座開設サンプル
 */
const moment = require('moment');
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
    const timestamp = moment().valueOf();

    const accounts = await accountService.open([
        {
            project: { typeOf: 'Project', id: 'cinerino' },
            accountType: 'Coin',
            accountNumber: `${timestamp}-01`,
            name: 'MOTION TARO'
        },
        {
            project: { typeOf: 'Project', id: 'cinerino' },
            accountType: 'Coin',
            accountNumber: `${timestamp}-02`,
            name: 'MOTION TARO'
        }
    ]);
    console.log('口座を開設しました。', accounts.map((account) => account.accountNumber));
}

main().then(() => {
    console.log('main processed.');
}).catch((err) => {
    console.error(err);
});
