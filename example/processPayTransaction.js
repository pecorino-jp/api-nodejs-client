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

const accessToken = 'eyJraWQiOiI0eVpocWlFZlFRVEVmSTNERlA1ZjBWQXpwazFLekFBa3RQd2haSGZHdzBzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZWJhZjU3My05OGMxLTRjZWEtODRiZi1lMjBlYmRjNjg2OWEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIG9wZW5pZCBwcm9maWxlIGh0dHBzOlwvXC9zc2t0cy1hcGktZGV2ZWxvcG1lbnQuYXp1cmV3ZWJzaXRlcy5uZXRcL3BsYWNlcy5yZWFkLW9ubHkgaHR0cHM6XC9cL3Nza3RzLWFwaS1kZXZlbG9wbWVudC5henVyZXdlYnNpdGVzLm5ldFwvcGVvcGxlLmNyZWRpdENhcmRzLnJlYWQtb25seSBodHRwczpcL1wvcGVjb3Jpbm8tYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC9hY2NvdW50cy5hY3Rpb25zLnJlYWQtb25seSBodHRwczpcL1wvc3NrdHMtYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC9wZW9wbGUuY29udGFjdHMgaHR0cHM6XC9cL3Nza3RzLWFwaS1kZXZlbG9wbWVudC5henVyZXdlYnNpdGVzLm5ldFwvcGVvcGxlLmNvbnRhY3RzLnJlYWQtb25seSBodHRwczpcL1wvc3NrdHMtYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC9wZW9wbGUub3duZXJzaGlwSW5mb3MgaHR0cHM6XC9cL3Nza3RzLWFwaS1kZXZlbG9wbWVudC5henVyZXdlYnNpdGVzLm5ldFwvcGVvcGxlLm93bmVyc2hpcEluZm9zLnJlYWQtb25seSBodHRwczpcL1wvcGVjb3Jpbm8tYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC90cmFuc2FjdGlvbnMgcGhvbmUgaHR0cHM6XC9cL3Nza3RzLWFwaS1kZXZlbG9wbWVudC5henVyZXdlYnNpdGVzLm5ldFwvZXZlbnRzLnJlYWQtb25seSBodHRwczpcL1wvc3NrdHMtYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC9vcmdhbml6YXRpb25zLnJlYWQtb25seSBodHRwczpcL1wvc3NrdHMtYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC9vcmRlcnMucmVhZC1vbmx5IGh0dHBzOlwvXC9zc2t0cy1hcGktZGV2ZWxvcG1lbnQuYXp1cmV3ZWJzaXRlcy5uZXRcL3Blb3BsZS5jcmVkaXRDYXJkcyBodHRwczpcL1wvc3NrdHMtYXBpLWRldmVsb3BtZW50LmF6dXJld2Vic2l0ZXMubmV0XC90cmFuc2FjdGlvbnMgZW1haWwiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfbG5xVWV2aVhqIiwiZXhwIjoxNTE3MzEwMDIxLCJpYXQiOjE1MTczMDY0MjEsInZlcnNpb24iOjIsImp0aSI6ImUwMjI1ZDg0LTE4MDAtNGU2Ny1hN2EyLWE4NWNjMGFkMTcyMiIsImNsaWVudF9pZCI6Iml0MjA3b2VhdGJkN2ZqZGN2c2Yzcm1za3UiLCJ1c2VybmFtZSI6Imlsb3ZlZ2FkZCJ9.HJh_ta3n3JRFYz4o3YnxajD8oMl3R2hBHKCbxlNh6Q4tyJL8ypop9YceZiMS_aeMTAZwEQTkFWjxBNXTV-2z97raqAAHIvYuTE9-ytWKZPgj7Q3atmNw3ubMqJbKpkZiLvrxvDZ1CUAw2Gk7iPYpjEwBz5RIVukUIJrUcwhrwNHDysER9sKIJEv1HBEIvdtHk4iSijdX9XgKnJKEVzcC-hdREcw2IXkQozDQLf9bBCd_fX0yzHeFDzD1z7yhwpjUnU0hfVvYbceW-BYP3yXOCKKdU9noFaDr-zcUIaGTKvQPjJnoIT8Lb6NzUPzY6tFvAlW6BDBcPPgTHnHdVLA_KQ';

const oauth2client = new pecorinoapi.auth.OAuth2({
    domain: process.env.TEST_AUTHORIZE_SERVER_DOMAIN
});
oauth2client.setCredentials({
    access_token: accessToken
});

const payTransactionService4backend = new pecorinoapi.service.transaction.Pay({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: auth
});

const payTransactionService4frontend = new pecorinoapi.service.transaction.Pay({
    endpoint: process.env.TEST_API_ENDPOINT,
    auth: oauth2client
});

async function main() {
    // フロントエンドで取引開始
    const transaction = await payTransactionService4frontend.start({
        expires: moment().add(10, 'minutes').toISOString(),
        recipient: {
            typeOf: 'Person',
            id: 'recipientId',
            name: 'recipientName',
            url: 'https://example.com'
        },
        price: 100,
        notes: 'notes'
    });
    console.log('取引が開始されました。', transaction.id);

    await wait(1000);

    // バックエンドで確定
    const transactionResult = await payTransactionService4backend.confirm({
        transactionId: transaction.id
    });
    console.log('取引確定です。取引履歴ID:', transactionResult.payAction.id);
}

async function wait(waitInMilliseconds) {
    return new Promise((resolve) => setTimeout(resolve, waitInMilliseconds));
}

main().then(() => {
    console.log('main processed.');
}).catch((err) => {
    console.error(err);
});
