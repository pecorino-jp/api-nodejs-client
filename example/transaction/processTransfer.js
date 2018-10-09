/**
 * 転送取引サンプル
 */
const moment = require('moment');
const readline = require('readline');
const util = require('util');
const client = require('../../lib/');

const auth = new client.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: []
});
const transactionService = new client.service.transaction.Transfer({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const { fromAccountNumber, toAccountNumber, amount, notes } = await new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('転送元の口座番号を入力してください。\n', async (fromAccountNumber) => {
            rl.question('転送先の口座番号を入力してください。\n', async (toAccountNumber) => {
                rl.question('金額を入力してください。\n', async (amount) => {
                    rl.question('取引説明を入力してください。\n', async (notes) => {
                        rl.close();
                        resolve({ fromAccountNumber, toAccountNumber, amount, notes });
                    });
                });
            });
        });
    });

    // フロントエンドで取引開始
    const transaction = await transactionService.start({
        expires: moment().add(10, 'minutes').toISOString(),
        agent: {
            typeOf: 'Organization',
            id: 'agent-id',
            name: '株式会社モーションピクチャー',
            url: 'https://motionpicture.jp'
        },
        recipient: {
            typeOf: 'Person',
            id: 'recipientId',
            name: 'recipientName',
            url: 'https://example.com'
        },
        amount: parseInt(amount, 10),
        accountType: 'Point',
        notes: notes,
        fromAccountNumber: fromAccountNumber,
        toAccountNumber: toAccountNumber
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // await transactionService.cancel({
    //     transactionId: transaction.id
    // });
    // console.log('取引を中止しました。');

    // 確定
    await transactionService.confirm({
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
