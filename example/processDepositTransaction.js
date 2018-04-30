/**
 * 支払取引サンプル
 * @ignore
 */

const moment = require('moment');
const util = require('util');
const pecorinoapi = require('../lib/');

const auth = new pecorinoapi.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: [
    ]
});

const oauth2client = new pecorinoapi.auth.OAuth2({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN
});
oauth2client.setCredentials({
    access_token: process.env.TEST_ACCESS_TOKEN
});

const depositTransactionService4backend = new pecorinoapi.service.transaction.Deposit({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const transaction = await depositTransactionService4backend.start({
        expires: moment().add(10, 'minutes').toISOString(),
        agent: {
            typeOf: 'Organization',
            id: 'agentId',
            name: 'agent name',
            url: 'https://example.com'
        },
        recipient: {
            typeOf: 'Person',
            id: 'recipientId',
            name: 'recipientName',
            url: 'https://example.com'
        },
        price: 100,
        notes: 'incentive',
        toAccountId: 'sskts-ilovegadd'
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // バックエンドで確定
    const transactionResult = await depositTransactionService4backend.confirm({
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
