// tslint:disable:no-console no-implicit-dependencies no-magic-numbers no-shadowed-variable
/**
 * 入金取引サンプル
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
const depositService = new client.service.transaction.Deposit({
    endpoint: <string>process.env.TEST_API_ENDPOINT,
    auth: auth
});

const project = { typeOf: client.factory.organizationType.Project, id: 'cinerino' };

async function main() {
    const { toAccountNumber, amount, notes } = await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('入金先の口座タイプを入力してください。\n', async (__) => {
            rl.question('入金先の口座番号を入力してください。\n', async (toAccountNumber) => {
                rl.question('入金金額を入力してください。\n', async (amount) => {
                    rl.question('取引説明を入力してください。\n', async (notes) => {
                        rl.close();
                        resolve({ toAccountNumber, amount, notes });
                    });
                });
            });
        });
    });

    const transactionNumber = `${project.id}-${(new Date()).valueOf()}`;
    console.log('取引が開始します...', toAccountNumber, amount, notes);
    const transaction = await depositService.start({
        typeOf: client.factory.account.transactionType.Deposit,
        transactionNumber: transactionNumber,
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
            id: 'recipient-id',
            name: 'recipient name',
            url: ''
        },
        object: {
            amount: { value: Number(amount) },
            description: notes,
            toLocation: {
                accountNumber: toAccountNumber
            }
        }
    });
    console.log('取引が開始されました。', transaction.transactionNumber);

    await wait(1000);

    // 確定
    // await depositService.cancel({ transactionNumber });
    await depositService.confirm({ transactionNumber });
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
