/**
 * 口座開設サンプル
 */
const moment = require('moment');
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
    const account = await accountService.open({
        name: 'sample name'
    });
    console.log('口座を開設しました。', account.accountNumber);
}

main().then(() => {
    console.log('main processed.');
}).catch((err) => {
    console.error(err);
});
