/**
 * 口座検索サンプル
 * @ignore
 */

const moment = require('moment');
const util = require('util');
const pecorinoapi = require('../lib/');

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
    const accounts = await accountService.search({
        accountNumbers: ['41500180315']
    });
    console.log('accounts:', accounts);
    console.log(accounts.length, 'accounts found.');
}

main().then(() => {
    console.log('main processed.');
}).catch(console.error);
