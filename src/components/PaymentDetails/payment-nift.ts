import CryptoJS from 'crypto-js';

const leftPadZero = (x) => {
  return x > 9 ? "" + x : "0" + x;
}

const getFormattedDateTime = (daysFromToday) => {
  let d = new Date();
  if (daysFromToday) {
    d.setDate(d.getDate() + daysFromToday);
  }
  let M = d.getMonth() + 1;
  let D = d.getDate();
  let H = d.getHours();
  let m = d.getMinutes() + 1;
  let s = d.getSeconds() + 1;
  let dateTime = "".concat(d.getFullYear().toString(), leftPadZero(M), leftPadZero(D), leftPadZero(H), leftPadZero(m), leftPadZero(s));
  return dateTime;
}

const computeHash = (params) => {
  const salt = process.env['NEXT_PUBLIC_NIFT_SECRET_KEY']
  let clearText = salt;
  Object.keys(params).sort().forEach(key => {
    if (params[key]) {
      clearText = `${clearText}&${params[key]}`;
    }
  });
  var hash = CryptoJS.HmacSHA256(clearText, salt);
  return hash;
}

const payWithNift = (payment_id, payable_amount , order_id , payment_for) => {
  // adding custom prefix
  const formatted_payment_id = 'TB' + (payment_id || Math.round(Math.random() * 1e6 + 10000) );
  // add 2 decimal zeroes and remove the point. (Required by NIFT)
  const formatted_payable_amount = Number(payable_amount).toFixed(2).replace('.', '');
  let params = {
    pp_Amount: formatted_payable_amount,
    pp_BillReference: formatted_payment_id,
    pp_Description: 'Takaful Bazar Policy Purchase',
    pp_Language: 'EN',
    pp_MerchantID: process.env['NEXT_PUBLIC_NIFT_MERCHANT_ID'],
    pp_Password: process.env['NEXT_PUBLIC_NIFT_MERCHANT_PASSWORD'],
    pp_ReturnURL: process.env['NEXT_PUBLIC_NIFT_RETURN_URL'],
    // "pp_SubMerchantID": '', optional according to docs
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: getFormattedDateTime(0),
    pp_TxnExpiryDateTime: getFormattedDateTime(1),
    pp_TxnRefNo: formatted_payment_id,
    pp_Version: '1.1',
    ppmpf_1:order_id,
    ppmpf_2:payment_for,
  }
  const pp_SecureHash = computeHash(params);
  const form_params = {
    ...params,
    pp_SecureHash,
  };
  let form = document.createElement("form");
  form.setAttribute("method", 'post');
  form.setAttribute("action", process.env['NEXT_PUBLIC_NIFT_GATEWAY_URL']);
  Object.keys(form_params).forEach(key => {
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", form_params[key]);
    form.appendChild(hiddenField);
  });
  document.body.appendChild(form);
  form.submit();
}

export default payWithNift;

/*
  NEXT_PUBLIC_API_ORIGIN=https://api-dev.takafulbazaar.com.pk/tb/api/
NEXT_PUBLIC_IMAGE_ORIGIN=https://api-dev.takafulbazaar.com.pk/
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyC3ESAAT6Rsg4ExI6qvAWeWlNrfu3H8GZs
NEXT_PUBLIC_ENCRYPTION_KEY=Secret Passphrase

# Alfalah Payment Integration

NEXT_PUBLIC_ALFA_HANDSHAKE_URL=https://payments.bankalfalah.com/HS/HS/HS
NEXT_PUBLIC_ALFA_SSO_URL=https://payments.bankalfalah.com/SSO/SSO/SSO
NEXT_PUBLIC_ALFA_STORE_ID=020207
NEXT_PUBLIC_ALFA_MERCHANT_ID=13786
NEXT_PUBLIC_ALFA_MERCHANT_USERNAME=afacug
NEXT_PUBLIC_ALFA_MERCHANT_PASSWORD=+UnzekFex5BvFzk4yqF7CA==
NEXT_PUBLIC_ALFA_MERCHANT_HASH=OUU362MB1uq8uFZg5Hc8c/4CU/dr8HSwjZ4QK8juhwgdR+coJVZZIZaXj5JjGLSt/rYeDMVBDTI=
NEXT_PUBLIC_ALFA_ENCRYPTION_KEY_1=3Q5ASSVTRnAFPqtR
NEXT_PUBLIC_ALFA_ENCRYPTION_KEY_2=1921113737265525
NEXT_PUBLIC_ALFA_RETURN_URL=https://dev.takafulbazaar.com.pk/payment-complete

# NIFT Payment Gateway

NEXT_PUBLIC_NIFT_GATEWAY_URL=https://uat-merchants.niftepay.pk/CustomerPortal/transactionmanagement/merchantform
NEXT_PUBLIC_NIFT_MERCHANT_ID=TFB001
NEXT_PUBLIC_NIFT_MERCHANT_PASSWORD=MG3HX6fB+1E=
NEXT_PUBLIC_NIFT_SECRET_KEY=lOB6sRnqZ04=
NEXT_PUBLIC_NIFT_RETURN_URL=https://dev.takafulbazaar.com.pk/payment-complete

*/