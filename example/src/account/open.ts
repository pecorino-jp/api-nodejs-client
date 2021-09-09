// tslint:disable:no-console no-implicit-dependencies
/**
 * 口座開設サンプル
 */
import * as  moment from 'moment';

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
    const timestamp = moment()
        .valueOf();

    const accounts = await accountService.open([
        {
            typeOf: client.factory.accountType.Account,
            project: { typeOf: 'Project', id: 'cinerino' },
            accountType: 'Coin',
            accountNumber: `${timestamp}-01`,
            name: 'MOTION TARO'
        },
        {
            typeOf: client.factory.accountType.Account,
            project: { typeOf: 'Project', id: 'cinerino' },
            accountType: 'Coin',
            accountNumber: `${timestamp}-02`,
            name: 'MOTION TARO'
        }
    ]);
    console.log('口座を開設しました。', (Array.isArray(accounts))
        ? accounts.map((account) => account.accountNumber)
        : accounts.accountNumber);
}

main()
    .then(() => {
        console.log('main processed.');
    })
    .catch(console.error);
