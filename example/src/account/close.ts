// tslint:disable:no-console
/**
 * 口座解約サンプル
 */
// import * as util from 'util';

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
    await accountService.close({
        accountNumber: '1574640851'
    });
    console.log('解約しました。');
}

main()
    .then(() => {
        console.log('main processed.');
    })
    .catch(console.error);
