import CryptoJS from 'crypto-js';

const performSSORequest = async ({ token, amount, order_id }) => {
  const params: any = {
    RequestHash: '',
    ChannelId: '1001',
    ReturnURL: process.env['NEXT_PUBLIC_ALFA_RETURN_URL'],
    MerchantId: process.env['NEXT_PUBLIC_ALFA_MERCHANT_ID'],
    StoreId: process.env['NEXT_PUBLIC_ALFA_STORE_ID'],
    MerchantHash: process.env['NEXT_PUBLIC_ALFA_MERCHANT_HASH'],
    MerchantUsername: process.env['NEXT_PUBLIC_ALFA_MERCHANT_USERNAME'],
    MerchantPassword: process.env['NEXT_PUBLIC_ALFA_MERCHANT_PASSWORD'],
    TransactionReferenceNumber: order_id,
    AuthToken: token,
    TransactionAmount: amount,
    Currency: 'PKR',
    IsBIN: '0',
    TransactionTypeId: '3',
    run: '',
  }
  const ordering = [
    'AuthToken',
    'RequestHash',
    'ChannelId',
    'Currency',
    'IsBIN',
    'ReturnURL',
    'MerchantId',
    'StoreId',
    'MerchantHash',
    'MerchantUsername',
    'MerchantPassword',
    'TransactionTypeId',
    'TransactionReferenceNumber',
    'TransactionAmount',
    'run',
  ];

  let clearTextChunks = ['RequestHash='];
  ordering.forEach(key => {
    clearTextChunks.push(`${key}=${params[key]}`);
  });
  // one more farmaishi item
  // prepare key and initialization vector
  const key = CryptoJS.enc.Utf8.parse(process.env['NEXT_PUBLIC_ALFA_ENCRYPTION_KEY_1']);
  const iv = CryptoJS.enc.Utf8.parse(process.env['NEXT_PUBLIC_ALFA_ENCRYPTION_KEY_2']);
  let clearText = CryptoJS.enc.Utf8.parse(clearTextChunks.join('&'));
  let cipherText = CryptoJS.AES.encrypt(clearText, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  params.RequestHash = cipherText;
  const payload_keys = [
    'AuthToken',
    'RequestHash',
    'ChannelId',
    'Currency',
    'IsBIN',
    'ReturnURL',
    'MerchantId',
    'StoreId',
    'MerchantHash',
    'MerchantUsername',
    'MerchantPassword',
    'TransactionTypeId',
    'TransactionReferenceNumber',
    'TransactionAmount',
  ];
  let form = document.createElement("form");
  form.setAttribute("method", 'post');
  form.setAttribute("action", process.env['NEXT_PUBLIC_ALFA_SSO_URL']);
  payload_keys.forEach(key => {
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  });
  document.body.appendChild(form);
  form.submit();
}

const payWithAlfalah = async (raw_order_id: any, payable_amount: any) => {
  try {
    let order_id = 'TB' + raw_order_id;
    const params: any = {
      HS_IsRedirectionRequest: '0',
      HS_ChannelId: '1001',
      HS_ReturnURL: process.env['NEXT_PUBLIC_ALFA_RETURN_URL'],
      HS_MerchantId: process.env['NEXT_PUBLIC_ALFA_MERCHANT_ID'],
      HS_StoreId: process.env['NEXT_PUBLIC_ALFA_STORE_ID'],
      HS_MerchantHash: process.env['NEXT_PUBLIC_ALFA_MERCHANT_HASH'],
      HS_MerchantUsername: process.env['NEXT_PUBLIC_ALFA_MERCHANT_USERNAME'],
      HS_MerchantPassword: process.env['NEXT_PUBLIC_ALFA_MERCHANT_PASSWORD'],
      HS_TransactionReferenceNumber: order_id || Math.round(Math.random() * 1e6 + 130),
    }
    const ordering = [
      'HS_IsRedirectionRequest',
      'HS_ChannelId',
      'HS_ReturnURL',
      'HS_MerchantId',
      'HS_StoreId',
      'HS_MerchantHash',
      'HS_MerchantUsername',
      'HS_MerchantPassword',
      'HS_TransactionReferenceNumber',
    ]
    let clearTextChunks = ['HS_RequestHash='];
    ordering.forEach(key => {
      clearTextChunks.push(`${key}=${params[key]}`);
    });
    clearTextChunks.push('handshake=');
    const key = CryptoJS.enc.Utf8.parse(process.env['NEXT_PUBLIC_ALFA_ENCRYPTION_KEY_1']);
    const iv = CryptoJS.enc.Utf8.parse(process.env['NEXT_PUBLIC_ALFA_ENCRYPTION_KEY_2']);
    let clearText = CryptoJS.enc.Utf8.parse(clearTextChunks.join('&'));
    let cipherText = CryptoJS.AES.encrypt(clearText, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    let formDataChunks: any = [];
    params.HS_RequestHash = cipherText;
    ordering.unshift('HS_RequestHash');
    ordering.forEach(key => {
      formDataChunks.push(`${key}=${encodeURIComponent(params[key])}`);
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formDataChunks.join('&'),
    }
    const hsUrl: any = process.env['NEXT_PUBLIC_ALFA_HANDSHAKE_URL'];
    let response = await fetch(hsUrl, options);
    let result = await response.json();
    if (result.AuthToken) {
      performSSORequest({
        token: result.AuthToken,
        amount: payable_amount,
        order_id: params.HS_TransactionReferenceNumber,
      });
    } else {
      alert('Failed to perform handshake with Alfa payment provider. Contact Site admin.');
    }
  } catch (error) {
    console.log(error);
  }
}

export default payWithAlfalah;