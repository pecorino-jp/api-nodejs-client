/**
 * 転送取引サンプル
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
const transactionService = new pecorinoapi.service.transaction.Transfer({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    // フロントエンドで取引開始
    const transaction = await transactionService.start({
        expires: moment().add(10, 'minutes').toISOString(),
        agent: {
            name: 'agentName'
        },
        recipient: {
            typeOf: 'Person',
            id: 'recipientId',
            name: 'recipientName',
            url: 'https://example.com'
        },
        amount: 100,
        notes: 'notes',
        fromAccountNumber: '41500280015',
        toAccountNumber: '41500180315'
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // バックエンドで確定
    const transactionResult = await transactionService.confirm({
        transactionId: transaction.id
    });
    console.log('取引確定です。');
}

async function wait(waitInMilliseconds) {
    return new Promise((resolve) => setTimeout(resolve, waitInMilliseconds));
}

main().then(() => {
    console.log('main processed.');
}).catch((err) => {
    console.error(err);
});
