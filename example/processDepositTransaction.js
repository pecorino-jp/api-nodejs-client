/**
 * 入金取引サンプル
 * @ignore
 */

const moment = require('moment');
const open = require('open');
const readline = require('readline');
const util = require('util');
const pecorinoapi = require('../lib/');

const auth = new pecorinoapi.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: []
});
const depositTransactionService = new pecorinoapi.service.transaction.Deposit({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const { toAccountId, amount, notes } = await new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('入金先の口座IDを入力してください。\n', async (toAccountId) => {
            rl.question('入金金額を入力してください。\n', async (amount) => {
                rl.question('取引説明を入力してください。\n', async (notes) => {
                    rl.close();
                    resolve({ toAccountId, amount, notes });
                });
            });
        });
    });

    console.log('取引が開始します...', toAccountId, amount, notes);
    const transaction = await depositTransactionService.start({
        expires: moment().add(10, 'minutes').toISOString(),
        agent: {
            typeOf: 'Organization',
            id: 'agent-id',
            name: '株式会社モーションピクチャー',
            url: 'https://motionpicture.jp'
        },
        recipient: {
            typeOf: 'Person',
            id: 'recipient-id',
            name: 'recipient name',
            url: ''
        },
        price: amount,
        notes: notes,
        toAccountId: toAccountId
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // バックエンドで確定
    const transactionResult = await depositTransactionService.confirm({
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
