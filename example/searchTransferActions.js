/**
 * 取引履歴検索サンプル
 * @ignore
 */

const moment = require('moment');
const util = require('util');
const pecorinoapi = require('../lib/');

const oauth2client = new pecorinoapi.auth.OAuth2({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN
});
oauth2client.setCredentials({
    access_token: process.env.TEST_ACCESS_TOKEN
});

const accountService = new pecorinoapi.service.Account({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: oauth2client
});

async function main() {
    const actions = await accountService.searchTransferActions({ accountId: 'me' });
    console.log('取引履歴は以下の通りです。');
    console.log(actions.map((a) => {
        return util.format(
            '%s %s %s %s[%s] -> %s[%s] @%s',
            a.endDate,
            a.typeOf,
            a.amount,
            a.fromLocation.name,
            (a.fromLocation.id !== undefined) ? a.fromLocation.id : '',
            a.toLocation.name,
            (a.toLocation.id !== undefined) ? a.toLocation.id : '',
            a.purpose.typeOf
        );
    }).join('\n'));
}

main().then(() => {
    console.log('main processed.');
}).catch(console.error);
