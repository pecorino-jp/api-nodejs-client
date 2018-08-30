/**
 * 取引履歴検索サンプル
 */
const util = require('util');
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
    const accountNumber = '1532937590';
    console.log('searching actions...account:', accountNumber);
    const actions = await accountService.searchMoneyTransferActions({
        accountType: 'Coin',
        accountNumber: accountNumber,
        limit: 3,
        page: 1,
        sort: {
            endDate: -1
            // amount: -1
        }
    });
    console.log('取引履歴は以下の通りです。');
    console.log(actions.map((a) => {
        return util.format(
            '%s %s %s %s[%s] -> %s[%s] @%s',
            a.endDate,
            a.typeOf,
            a.amount,
            a.fromLocation.name,
            (a.fromLocation.accountNumber !== undefined) ? a.fromLocation.accountNumber : '',
            a.toLocation.name,
            (a.toLocation.accountNumber !== undefined) ? a.toLocation.accountNumber : '',
            a.purpose.typeOf
        );
    }).join('\n'));
}

main().then(() => {
    console.log('main processed.');
}).catch(console.error);
