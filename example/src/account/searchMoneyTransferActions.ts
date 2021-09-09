// tslint:disable:no-console
/**
 * 取引履歴検索サンプル
 */
import * as util from 'util';

import * as  client from '../../../lib/';

const auth = new client.auth.ClientCredentials({
    domain: <string>process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: <string>process.env.TEST_CLIENT_ID,
    clientSecret: <string>process.env.TEST_CLIENT_SECRET,
    scopes: [],
    state: ''
});
const accountService = new client.service.Account({
    endpoint: <string>process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const accountNumber = '60108118500';
    console.log('searching actions...account:', accountNumber);
    const { data } = await accountService.searchMoneyTransferActions({
        amount: { currency: { $eq: 'Point' } },
        accountNumber: accountNumber,
        limit: 10,
        page: 1,
        sort: {
            startDate: -1
            // amount: -1
        }
    });
    console.log('取引履歴は以下の通りです。');
    console.log(data.map((a) => {
        return util.format(
            '%s %s %s %s[%s] -> %s[%s] @%s',
            a.endDate,
            a.typeOf,
            a.amount,
            a.fromLocation.name,
            ((<client.factory.account.IAccount>a.fromLocation).accountNumber !== undefined)
                ? (<client.factory.account.IAccount>a.fromLocation).accountNumber
                : '',
            a.toLocation.name,
            ((<client.factory.account.IAccount>a.toLocation).accountNumber !== undefined)
                ? (<client.factory.account.IAccount>a.toLocation).accountNumber
                : '',
            a.purpose.typeOf
        );
    })
        .join('\n'));
}

main()
    .then(() => {
        console.log('main processed.');
    })
    .catch(console.error);
