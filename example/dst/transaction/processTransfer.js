"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console no-implicit-dependencies no-magic-numbers no-shadowed-variable
/**
 * 転送取引サンプル
 */
const moment = require("moment");
// import * as  open from 'open';
const readline = require("readline");
// import * as  util from 'util';
const client = require("../../../lib/");
const auth = new client.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: [],
    state: ''
});
const transferService = new client.service.transaction.Transfer({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});
const project = { typeOf: client.factory.organizationType.Project, id: 'cinerino' };
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromAccountNumber, toAccountNumber, amount, notes } = yield new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('転送元の口座番号を入力してください。\n', (fromAccountNumber) => __awaiter(this, void 0, void 0, function* () {
                rl.question('転送先の口座番号を入力してください。\n', (toAccountNumber) => __awaiter(this, void 0, void 0, function* () {
                    rl.question('金額を入力してください。\n', (amount) => __awaiter(this, void 0, void 0, function* () {
                        rl.question('取引説明を入力してください。\n', (notes) => __awaiter(this, void 0, void 0, function* () {
                            rl.close();
                            resolve({ fromAccountNumber, toAccountNumber, amount, notes });
                        }));
                    }));
                }));
            }));
        });
        // 取引開始
        const transaction = yield transferService.start({
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
        yield wait(1000);
        // await transactionService.cancel({
        //     transactionId: transaction.id
        // });
        // console.log('取引を中止しました。');
        // 確定
        yield transferService.confirm(transaction);
        console.log('取引確定です。');
    });
}
function wait(waitInMilliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, waitInMilliseconds));
    });
}
main()
    .then(() => {
    console.log('main processed.');
})
    .catch(console.error);
