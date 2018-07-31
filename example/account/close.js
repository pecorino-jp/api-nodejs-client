/**
 * 口座解約サンプル
 */
const util = require('util');
const pecorinoapi = require('../../lib/');

const auth = new pecorinoapi.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: []
});
const accountService = new pecorinoapi.service.Account({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    await accountService.close({
        accountType: 'Coin',
        accountNumber: '1532938324'
    });
    console.log('解約しました。');
}

main().then(() => {
    console.log('main processed.');
}).catch((err) => {
    console.error(err);
});
