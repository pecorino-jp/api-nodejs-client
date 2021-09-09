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
// tslint:disable:no-console no-implicit-dependencies
/**
 * 口座開設サンプル
 */
const moment = require("moment");
const client = require("../../../lib/");
const auth = new client.auth.ClientCredentials({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN,
    clientId: process.env.TEST_CLIENT_ID,
    clientSecret: process.env.TEST_CLIENT_SECRET,
    scopes: [],
    state: ''
});
const accountService = new client.service.Account({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = moment()
            .valueOf();
        const accounts = yield accountService.open([
            {
                typeOf: client.factory.accountType.Account,
                project: { typeOf: 'Project', id: 'cinerino' },
                accountType: 'Coin',
                accountNumber: `${timestamp}-01`,
                name: 'MOTION TARO'
            },
            {
                typeOf: client.factory.accountType.Account,
                project: { typeOf: 'Project', id: 'cinerino' },
                accountType: 'Coin',
                accountNumber: `${timestamp}-02`,
                name: 'MOTION TARO'
            }
        ]);
        console.log('口座を開設しました。', (Array.isArray(accounts))
            ? accounts.map((account) => account.accountNumber)
            : accounts.accountNumber);
    });
}
main()
    .then(() => {
    console.log('main processed.');
})
    .catch(console.error);
