/**
 * 入金取引サンプル
 */
const moment = require('moment');
const open = require('open');
const readline = require('readline');
const util = require('util');
const client = require('../../lib/');

const auth = new client.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: []
});
const depositService = new client.service.transaction.Deposit({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

async function main() {
    const { toAccountNumber, amount, notes } = await new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('入金先の口座番号を入力してください。\n', async (toAccountNumber) => {
            rl.question('入金金額を入力してください。\n', async (amount) => {
                rl.question('取引説明を入力してください。\n', async (notes) => {
                    rl.close();
                    resolve({ toAccountNumber, amount, notes });
                });
            });
        });
    });

    console.log('取引が開始します...', toAccountNumber, amount, notes);
    const transaction = await depositService.start({
        project: { typeOf: 'Project', id: 'cinerino' },
        expires: moment().add(10, 'minutes').toDate(),
        agent: {
            typeOf: 'Organization',
            id: 'agent-id',
            name: 'Pecorino SDK Sample',
            url: 'https://motionpicture.jp'
        },
        recipient: {
            typeOf: 'Person',
            id: 'recipient-id',
            name: 'recipient name',
            url: ''
        },
        object: {
            amount: parseInt(amount, 10),
            description: notes,
            toLocation: {
                accountType: 'Coin',
                accountNumber: toAccountNumber
            }
        }
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // 確定
    await depositService.confirm(transaction);
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
