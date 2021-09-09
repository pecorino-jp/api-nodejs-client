// tslint:disable:no-console
/**
 * 口座検索サンプル
 */
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
    const { data } = await accountService.search({
        // project: { id: { $eq: '' } },
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
    console.log(data.length, 'accounts returned.');
}

main()
    .then(() => {
        console.log('main processed.');
    })
    .catch(console.error);
