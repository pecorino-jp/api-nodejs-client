/**
 * アクション検索サンプル
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
const actionService = new pecorinoapi.service.Action({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const actions = await actionService.search({
        typeOf: pecorinoapi.factory.actionType.MoneyTransfer,
        // actionStatuses?: factory.accountStatusType[];
        startDateFrom: moment().add(-1, 'month').toDate(),
        startDateThrough: moment().toDate(),
        // purposeTypeOfs?: factory.transactionType[];
        fromLocationAccountNumbers: ['41500180315'],
        // toLocationAccountNumbers?: string[];
        limit: 100
    });
    console.log('actions:', actions);
    console.log(actions.length, 'actions found.');
}

main().then(() => {
    console.log('main processed.');
}).catch(console.error);
