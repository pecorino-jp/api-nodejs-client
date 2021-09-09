// tslint:disable:no-console no-implicit-dependencies no-magic-numbers no-shadowed-variable
/**
 * 転送取引サンプル
 */
import * as  moment from 'moment';
// import * as  open from 'open';
import * as  readline from 'readline';
// import * as  util from 'util';

import * as  client from '../../../lib/';

const auth = new client.auth.ClientCredentials({
    domain: <string>process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: <string>process.env.TEST_CLIENT_ID,
    clientSecret: <string>process.env.TEST_CLIENT_SECRET,
    scopes: [],
    state: ''
});
const transferService = new client.service.transaction.Transfer({
    endpoint: <string>process.env.TEST_API_ENDPOINT,
    auth: auth
});

const project = { typeOf: client.factory.organizationType.Project, id: 'cinerino' };

async function main() {
    const { fromAccountNumber, toAccountNumber, amount, notes } = await new Promise((resolve) => {
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

    // 取引開始
    const transaction = await transferService.start({
        typeOf: client.factory.account.transactionType.Transfer,
        project: { typeOf: client.factory.organizationType.Project, id: project.id },
        expires: moment()
            .add(10, 'minutes')
            .toDate(),
        agent: {
            typeOf: client.factory.organizationType.Corporation,
            project: { typeOf: client.factory.organizationType.Project, id: project.id },
            id: 'agent-id',
            name: 'Pecorino SDK Sample',
            url: 'https://motionpicture.jp'
        },
        recipient: {
            typeOf: client.factory.personType.Person,
            id: 'recipientId',
            name: 'recipientName',
            url: 'https://example.com'
        },
        object: {
            amount: { value: Number(amount) },
            description: notes,
            fromLocation: {
                accountNumber: fromAccountNumber
            },
            toLocation: {
                accountNumber: toAccountNumber
            }
        }
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // await transactionService.cancel({
    //     transactionId: transaction.id
    // });
    // console.log('取引を中止しました。');

    // 確定
    await transferService.confirm(transaction);
    console.log('取引確定です。');
}

async function wait(waitInMilliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, waitInMilliseconds));
}

main()
    .then(() => {
        console.log('main processed.');
    })
    .catch(console.error);
